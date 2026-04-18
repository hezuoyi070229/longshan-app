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
            @RequestParam(required = false) String date) {
        LocalDate departDate = date != null ? LocalDate.parse(date) : null;
        List<BusSchedule> list = busService.listSchedules(direction, departDate);
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
