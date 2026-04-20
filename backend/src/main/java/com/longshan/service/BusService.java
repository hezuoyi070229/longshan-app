package com.longshan.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.longshan.entity.BusBooking;
import com.longshan.entity.BusSchedule;
import com.longshan.mapper.BusBookingMapper;
import com.longshan.mapper.BusScheduleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class BusService extends ServiceImpl<BusScheduleMapper, BusSchedule> {
    
    @Autowired
    private BusBookingMapper bookingMapper;
    
    public List<BusSchedule> listSchedules(String direction, LocalDate date, LocalDate endDate) {
        LambdaQueryWrapper<BusSchedule> wrapper = new LambdaQueryWrapper<>();
        if (direction != null && !direction.isEmpty()) {
            wrapper.eq(BusSchedule::getDirection, direction);
        }
        if (date != null && endDate != null) {
            // 日期范围查询
            wrapper.ge(BusSchedule::getDepartDate, date)
                   .le(BusSchedule::getDepartDate, endDate);
        } else if (date != null) {
            // 单日期查询
            wrapper.eq(BusSchedule::getDepartDate, date);
        }
        wrapper.orderByAsc(BusSchedule::getDepartDate)
               .orderByAsc(BusSchedule::getDepartTime);
        return list(wrapper);
    }
    
    public List<BusSchedule> listSchedulesByDateRange(String direction, LocalDate startDate, LocalDate endDate) {
        return listSchedules(direction, startDate, endDate);
    }
    
    @Transactional
    public BusBooking bookBus(Long scheduleId, String userName, String phone) {
        BusSchedule schedule = getById(scheduleId);
        if (schedule == null) {
            throw new RuntimeException("班次不存在");
        }
        
        if (schedule.getBookedSeats() >= schedule.getMaxSeats()) {
            throw new RuntimeException("该班次已满");
        }
        
        // 生成随机验证码
        String checkinCode = String.format("%04d", new Random().nextInt(10000));
        
        BusBooking booking = new BusBooking();
        booking.setScheduleId(scheduleId);
        booking.setUserName(userName);
        booking.setPhone(phone);
        booking.setCheckinCode(checkinCode);
        booking.setStatus("已预约");
        booking.setPayStatus("待支付");
        bookingMapper.insert(booking);
        
        // 更新已预约座位数
        schedule.setBookedSeats(schedule.getBookedSeats() + 1);
        if (schedule.getBookedSeats() >= schedule.getMaxSeats()) {
            schedule.setStatus("已满");
        }
        updateById(schedule);
        
        return booking;
    }
    
    public List<BusBooking> getMyBookings(String userId) {
        LambdaQueryWrapper<BusBooking> wrapper = new LambdaQueryWrapper<>();
        // 简化处理
        wrapper.orderByDesc(BusBooking::getBookingTime);
        return bookingMapper.selectList(wrapper);
    }
    
    @Transactional
    public void cancelBooking(Long bookingId) {
        BusBooking booking = bookingMapper.selectById(bookingId);
        if (booking == null) {
            throw new RuntimeException("预约不存在");
        }
        
        booking.setStatus("已取消");
        bookingMapper.updateById(booking);
        
        // 释放座位
        BusSchedule schedule = getById(booking.getScheduleId());
        if (schedule != null) {
            schedule.setBookedSeats(schedule.getBookedSeats() - 1);
            if (schedule.getBookedSeats() < schedule.getMaxSeats()) {
                schedule.setStatus("可预约");
            }
            updateById(schedule);
        }
    }
}
