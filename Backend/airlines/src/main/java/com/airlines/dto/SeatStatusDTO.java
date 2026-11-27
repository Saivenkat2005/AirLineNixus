package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatStatusDTO {
    private String id;
    private String number;
    private String status;
    private boolean isPremium;
}
