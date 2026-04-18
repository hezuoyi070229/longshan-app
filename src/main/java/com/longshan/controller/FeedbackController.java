package com.longshan.controller;

import com.longshan.common.Result;
import com.longshan.entity.Feedback;
import com.longshan.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;
    
    @GetMapping
    public Result<List<Feedback>> list(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isPublic) {
        List<Feedback> list = feedbackService.listFeedbacks(category, isPublic);
        return Result.success(list);
    }
    
    @GetMapping("/{id}")
    public Result<Feedback> detail(@PathVariable Long id) {
        Feedback feedback = feedbackService.getFeedbackDetail(id);
        if (feedback == null) {
            return Result.error("反馈不存在");
        }
        return Result.success(feedback);
    }
    
    @PostMapping
    public Result<Long> create(@RequestBody Feedback feedback) {
        Feedback saved = feedbackService.submitFeedback(feedback);
        return Result.success("提交成功", saved.getId());
    }
    
    @PostMapping("/{id}/upvote")
    public Result<Integer> upvote(@PathVariable Long id) {
        try {
            feedbackService.upvoteFeedback(id);
            Feedback feedback = feedbackService.getById(id);
            return Result.success("点赞成功", feedback.getUpvotes());
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
