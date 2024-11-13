package ru.ciuis.vblog.service;

import ru.ciuis.vblog.exception.EmailSendException;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.util.Properties;

@Service
public class MailService {
    private final Gmail gmailService;

    @Autowired
    public MailService(Gmail gmailService) {
        this.gmailService = gmailService;
    }

    public void sendMail(String address, String subject, String content) throws Exception {
        Properties properties = new Properties();
        Session session = Session.getInstance(properties, null);
        MimeMessage email = new MimeMessage(session);

        try {
            email.setFrom(new InternetAddress("vblogauthservice@gmail.com"));
            email.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(address));
            email.setSubject(subject);
            email.setText(content);

            ByteArrayOutputStream buf = new ByteArrayOutputStream();
            email.writeTo(buf);
            byte[] msgBytes = buf.toByteArray();
            String encodedEmail = Base64.encodeBase64URLSafeString(msgBytes);

            Message message = new Message();
            message.setRaw(encodedEmail);
            message = gmailService.users().messages().send("me", message).execute();
        } catch (Exception e) {
            throw new EmailSendException();
        }
    }
}
