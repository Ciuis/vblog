package ru.ciuis.vblog.exception;

import java.io.Serial;

public class EmailTakenException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public EmailTakenException() {
        super("This email is already taken.");
    }
}
