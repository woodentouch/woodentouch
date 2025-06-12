package com.wooden.project.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Represents the different sizes a product can have.  The database contains
 * several variations for the size value (for example "XS offerte" or
 * lowercase "Xs").  In order to keep compatibility with those values we store
 * the exact string used in the database for each enum constant.
 */
public enum Taille {
    XS("XS"),
    S("S"),
    M("M"),
    L("L"),
    XL("XL"),

    /** Value stored as "Xs" in the database */
    XS_LOWER("Xs"),

    /** Value stored as "XS offerte" in the database */
    XS_OFFERT("XS offerte"),

    /** Value stored as "Xs offerte" in the database */
    XS_OFFERT_LOWER("Xs offerte"),

    /** Additional textual sizes present in the dump */
    STANDARD("Standard"),
    MOYEN("Moyen");

    private final String dbValue;

    Taille(String dbValue) {
        this.dbValue = dbValue;
    }

    @JsonValue
    public String getDbValue() {
        return dbValue;
    }

    @JsonCreator
    public static Taille fromValue(String value) {
        if (value == null) {
            return null;
        }
        for (Taille t : values()) {
            if (t.dbValue.equalsIgnoreCase(value)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Unknown taille: " + value);
    }

    /**
     * JPA converter used to store and load enum values using the string stored
     * in {@link #dbValue} instead of the enum constant name.
     */
    @Converter(autoApply = true)
    public static class TailleConverter implements AttributeConverter<Taille, String> {
        @Override
        public String convertToDatabaseColumn(Taille attribute) {
            return attribute != null ? attribute.dbValue : null;
        }

        @Override
        public Taille convertToEntityAttribute(String dbData) {
            return Taille.fromValue(dbData);
        }
    }
}
