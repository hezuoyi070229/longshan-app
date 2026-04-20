package com.longshan.controller;

import com.longshan.common.Result;
import com.longshan.entity.Activity;
import com.longshan.entity.ActivitySignup;
import com.longshan.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    
    @Autowired
    private ActivityService activityService;
    
    @GetMapping
    public Result<List<Activity>> list(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status) {
        List<Activity> list = activityService.listActivities(category, status);
        return Result.success(list);
    }
    
    @GetMapping("/{id}")
    public Result<Map<String, Object>> detail(@PathVariable Long id) {
        Activity activity = activityService.getActivityDetail(id);
        if (activity == null) {
            return Result.error("活动不存在");
        }
        
        List<ActivitySignup> signups = activityService.getActivitySignups(id);
        
        Map<String, Object> result = new HashMap<>();
        result.put("activity", activity);
        result.put("signups", signups);
        
        return Result.success(result);
    }
    
    @PostMapping
    public Result<Long> create(@RequestBody Activity activity) {
        activity.setCurrentPeople(0);
        activity.setStatus("报名中");
        activityService.save(activity);
        return Result.success("创建成功", activity.getId());
    }
    
    @PostMapping("/{id}/signup")
    public Result<ActivitySignup> signup(
            @PathVariable Long id,
            @RequestBody Map<String, String> params) {
        try {
            String userName = params.get("userName");
            String phone = params.get("phone");
            ActivitySignup signup = activityService.signupActivity(id, userName, phone);
            return Result.success("报名成功", signup);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    
    @GetMapping("/my")
    public Result<List<Activity>> myActivities(@RequestParam String userId) {
        List<Activity> list = activityService.getMyActivities(userId);
        return Result.success(list);
    }
}
