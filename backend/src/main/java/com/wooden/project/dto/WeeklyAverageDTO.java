package com.wooden.project.dto;

public class WeeklyAverageDTO {
    private int week;
    private double average;

    public WeeklyAverageDTO(int week, double average) {
        this.week = week;
        this.average = average;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = average;
    }
}
