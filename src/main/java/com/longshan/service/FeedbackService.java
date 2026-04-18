package com.longshan.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.longshan.entity.Feedback;
import com.longshan.mapper.FeedbackMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService extends ServiceImpl<FeedbackMapper, Feedback> {
    
    public List<Feedback> listFeedbacks(String category, Boolean isPublic) {
        LambdaQueryWrapper<Feedback> wrapper = new LambdaQueryWrapper<>();
        if (category != null && !category.isEmpty()) {
            wrapper.eq(Feedback::getCategory, category);
        }
        if (isPublic != null) {
            wrapper.eq(Feedback::getIsPublic, isPublic);
        }
        wrapper.orderByDesc(Feedback::getCreateTime);
        return list(wrapper);
    }
    
    public Feedback submitFeedback(Feedback feedback) {
        feedback.setStatus("待处理");
        feedback.setIsPublic(true);
        feedback.setUpvotes(0);
        feedback.setPriority(0);
        save(feedback);
        return feedback;
    }
    
    public void upvoteFeedback(Long id) {
        Feedback feedback = getById(id);
        if (feedback == null) {
            throw new RuntimeException("反馈不存在");
        }
        
        feedback.setUpvotes(feedback.getUpvotes() + 1);
        
        // 如果点赞数超过20，设置较高优先级
        if (feedback.getUpvotes() >= 20) {
            feedback.setPriority(1);
        }
        
        updateById(feedback);
    }
    
    public Feedback getFeedbackDetail(Long id) {
        return getById(id);
    }
}
