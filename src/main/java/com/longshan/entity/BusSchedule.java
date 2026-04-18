package com.longshan.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@TableName("bus_schedules")
public class BusSchedule {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String routeName;
    
    private String direction;
    
    private LocalDate departDate;
    
    private LocalTime departTime;
    
    private LocalTime arriveTime;
    
    private Integer maxSeats;
    
    private Integer bookedSeats;
    
    private BigDecimal price;
    
    private String status;
    
    private String fromLocation;
    
    private String toLocation;
    
    private BigDecimal fromLat;
    
    private BigDecimal fromLng;
    
    private BigDecimal toLat;
    
    private BigDecimal toLng;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public LocalDate getDepartDate() {
        return departDate;
    }

    public void setDepartDate(LocalDate departDate) {
        this.departDate = departDate;
    }

    public LocalTime getDepartTime() {
        return departTime;
    }

    public void setDepartTime(LocalTime departTime) {
        this.departTime = departTime;
    }

    public LocalTime getArriveTime() {
        return arriveTime;
    }

    public void setArriveTime(LocalTime arriveTime) {
        this.arriveTime = arriveTime;
    }

    public Integer getMaxSeats() {
        return maxSeats;
    }

    public void setMaxSeats(Integer maxSeats) {
        this.maxSeats = maxSeats;
    }

    public Integer getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(Integer bookedSeats) {
        this.bookedSeats = bookedSeats;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }

    public BigDecimal getFromLat() {
        return fromLat;
    }

    public void setFromLat(BigDecimal fromLat) {
        this.fromLat = fromLat;
    }

    public BigDecimal getFromLng() {
        return fromLng;
    }

    public void setFromLng(BigDecimal fromLng) {
        this.fromLng = fromLng;
    }

    public BigDecimal getToLat() {
        return toLat;
    }

    public void setToLat(BigDecimal toLat) {
        this.toLat = toLat;
    }

    public BigDecimal getToLng() {
        return toLng;
    }

    public void setToLng(BigDecimal toLng) {
        this.toLng = toLng;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
