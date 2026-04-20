package com.longshan.controller;

import com.longshan.common.Result;
import com.longshan.entity.BusBooking;
import com.longshan.entity.BusSchedule;
import com.longshan.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bus")
public class BusController {
    
    @Autowired
    private BusService busService;
    
    @GetMapping("/schedules")
    public Result<List<BusSchedule>> listSchedules(
            @RequestParam(required = false) String direction,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        // 支持单日期查询
        if (date != null && !date.isEmpty()) {
            LocalDate departDate = LocalDate.parse(date);
            List<BusSchedule> list = busService.listSchedules(direction, departDate, null);
            return Result.success(list);
        }
        
        // 支持日期范围查询
        if (startDate != null && !startDate.isEmpty() && endDate != null && !endDate.isEmpty()) {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            List<BusSchedule> list = busService.listSchedulesByDateRange(direction, start, end);
            return Result.success(list);
        }
        
        // 默认查询所有
        List<BusSchedule> list = busService.listSchedules(direction, null, null);
        return Result.success(list);
    }
    
    @PostMapping("/book")
    public Result<BusBooking> book(@RequestBody Map<String, Object> params) {
        try {
            Long scheduleId = Long.valueOf(params.get("scheduleId").toString());
            String userName = (String) params.get("userName");
            String phone = (String) params.get("phone");
            BusBooking booking = busService.bookBus(scheduleId, userName, phone);
            return Result.success("预约成功", booking);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    
    @GetMapping("/bookings")
    public Result<List<BusBooking>> myBookings(@RequestParam String userId) {
        List<BusBooking> list = busService.getMyBookings(userId);
        return Result.success(list);
    }
    
    @PostMapping("/bookings/{id}/cancel")
    public Result<String> cancelBooking(@PathVariable Long id) {
        try {
            busService.cancelBooking(id);
            return Result.success("取消成功", null);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
