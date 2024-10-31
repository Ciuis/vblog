package ru.ciuis.vblog.exception;

import java.io.Serial;

public class FailedVerificationException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public FailedVerificationException() {
        super("Failed to verify email, code is incorrect");
    }
}
