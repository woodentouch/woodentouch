package com.wooden.project.dto;

public class LicenseStatDTO {
    private String licenseName;
    private long count;
    private double percentage;

    public LicenseStatDTO(String licenseName, long count, double percentage) {
        this.licenseName = licenseName;
        this.count = count;
        this.percentage = percentage;
    }

    public String getLicenseName() {
        return licenseName;
    }

    public void setLicenseName(String licenseName) {
        this.licenseName = licenseName;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
}