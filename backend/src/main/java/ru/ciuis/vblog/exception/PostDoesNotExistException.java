package ru.ciuis.vblog.exception;

public class PostDoesNotExistException extends RuntimeException {
    public static final long serialVersionUID = 1L;

    public PostDoesNotExistException() {
        super("The requested post does not exist");
    }
}
