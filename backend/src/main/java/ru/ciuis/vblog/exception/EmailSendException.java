package ru.ciuis.vblog.exception;

public class EmailSendException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public EmailSendException() {
        super("Failed to send Email.");
    }
}
