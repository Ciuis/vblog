package ru.ciuis.vblog.config;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailConfiguration {
    private static final String APPLICATION_NAME = "vblog";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKEN_DIR_PATH = "tokens";
}
