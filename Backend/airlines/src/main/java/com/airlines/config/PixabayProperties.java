package com.airlines.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "pixabay.api")
public class PixabayProperties {
    private String key;

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }
}
