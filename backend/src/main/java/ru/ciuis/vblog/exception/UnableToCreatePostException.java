package ru.ciuis.vblog.exception;

public class UnableToCreatePostException extends RuntimeException {
    public static final long serialVersionUID = 1L;

    public UnableToCreatePostException() {
        super("Unable to create a post");
    }
}
