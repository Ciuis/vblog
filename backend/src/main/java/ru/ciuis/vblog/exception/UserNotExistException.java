package ru.ciuis.vblog.exception;

import java.io.Serial;

public class UserNotExistException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public UserNotExistException() {
        super("The user doesn't exist");
    }
}
