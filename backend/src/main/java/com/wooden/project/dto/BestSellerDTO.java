package com.wooden.project.dto;

public class BestSellerDTO {
    private String productName;
    private String licenseName;
    private int quantitySold;
    private double total;

    public BestSellerDTO(String productName, String licenseName, int quantitySold, double total) {
        this.productName = productName;
        this.licenseName = licenseName;
        this.quantitySold = quantitySold;
        this.total = total;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getLicenseName() {
        return licenseName;
    }

    public void setLicenseName(String licenseName) {
        this.licenseName = licenseName;
    }

    public int getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(int quantitySold) {
        this.quantitySold = quantitySold;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}