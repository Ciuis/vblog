package ru.ciuis.vblog.exception;

import java.io.Serial;

public class FollowException extends Exception {
    @Serial
    private static final long serialVersionUID = 1L;

    public FollowException() {
        super("Users cannot follow themselves");
    }
}
