package com.longshan.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.longshan.entity.Activity;
import com.longshan.entity.ActivitySignup;
import com.longshan.mapper.ActivityMapper;
import com.longshan.mapper.ActivitySignupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class ActivityService extends ServiceImpl<ActivityMapper, Activity> {
    
    @Autowired
    private ActivitySignupMapper signupMapper;
    
    public List<Activity> listActivities(String category, String status) {
        LambdaQueryWrapper<Activity> wrapper = new LambdaQueryWrapper<>();
        if (category != null && !category.isEmpty()) {
            wrapper.eq(Activity::getCategory, category);
        }
        if (status != null && !status.isEmpty()) {
            wrapper.eq(Activity::getStatus, status);
        }
        wrapper.orderByDesc(Activity::getCreateTime);
        return list(wrapper);
    }
    
    public Activity getActivityDetail(Long id) {
        return getById(id);
    }
    
    @Transactional
    public ActivitySignup signupActivity(Long activityId, String userName, String phone) {
        Activity activity = getById(activityId);
        if (activity == null) {
            throw new RuntimeException("活动不存在");
        }
        
        ActivitySignup signup = new ActivitySignup();
        signup.setActivityId(activityId);
        signup.setUserName(userName);
        signup.setUserPhone(phone);
        signup.setStatus("已报名");
        signupMapper.insert(signup);
        
        // 更新报名人数
        activity.setCurrentPeople(activity.getCurrentPeople() + 1);
        
        // 检查是否满员
        if (activity.getCurrentPeople() >= activity.getMinPeople() && 
            "报名中".equals(activity.getStatus())) {
            activity.setStatus("已排期");
            // 设置第一个建议日期为排期日期
            if (activity.getProposedDates() != null && !activity.getProposedDates().isEmpty()) {
                String firstDate = activity.getProposedDates().split(",")[0];
                activity.setScheduledDate(LocalDate.parse(firstDate));
            }
        }
        
        updateById(activity);
        return signup;
    }
    
    public List<ActivitySignup> getActivitySignups(Long activityId) {
        LambdaQueryWrapper<ActivitySignup> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ActivitySignup::getActivityId, activityId);
        return signupMapper.selectList(wrapper);
    }
    
    public List<Activity> getMyActivities(String userId) {
        LambdaQueryWrapper<Activity> wrapper = new LambdaQueryWrapper<>();
        // 这里简化处理，实际应该根据 userId 查询
        wrapper.orderByDesc(Activity::getCreateTime);
        return list(wrapper);
    }
}
