package ru.ciuis.vblog.exception;

import java.io.Serial;

public class UnableToSavePhotoException extends Exception {
    @Serial
    private static final long serialVersionUID = 1L;

    public UnableToSavePhotoException() {
        super("Unable to save the photo");
    }
}
