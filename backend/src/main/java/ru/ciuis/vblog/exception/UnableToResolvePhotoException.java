package ru.ciuis.vblog.exception;

import java.io.Serial;

public class UnableToResolvePhotoException extends Exception {
    @Serial
    private static final long serialVersionUID = 1L;

    public UnableToResolvePhotoException() {
        super("The photo you're looking for not found");
    }
}
