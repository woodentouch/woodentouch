package com.wooden.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private int status;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        return new Result<>(0, "", data);
    }
}
