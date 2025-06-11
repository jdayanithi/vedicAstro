package com.vedicastrology.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DifficultyLevel {
    beginner,
    intermediate,
    advanced;

    @JsonCreator
    public static DifficultyLevel fromString(String value) {
        if (value == null) {
            return null;
        }
        for (DifficultyLevel level : DifficultyLevel.values()) {
            if (level.name().equalsIgnoreCase(value)) {
                return level;
            }
        }
        throw new IllegalArgumentException("Invalid difficulty level: " + value + 
            ". Valid values are: beginner, intermediate, advanced (case insensitive)");
    }

    @JsonValue
    public String getValue() {
        return this.name();
    }
}
