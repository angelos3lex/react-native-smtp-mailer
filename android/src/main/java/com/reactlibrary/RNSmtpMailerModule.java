
package com.reactlibrary;

import android.os.AsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import java.security.AccessController;
import java.security.Provider;
import java.security.Security;
import java.util.Date;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.BodyPart;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class RNSmtpMailerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNSmtpMailerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNSmtpMailer";
    }

    @ReactMethod
    public void sendMail(final ReadableMap obj, final Promise promise) {
        AsyncTask.execute(new Runnable() {

            String mailhost = obj.getString("mailhost");
            String port = obj.getString("port");
            Boolean ssl = obj.getBoolean("ssl");
            String username = obj.getString("username");
            String password = obj.getString("password");
            String from = obj.getString("from");
            String recipients = obj.getString("recipients");
            ReadableArray bcc = obj.hasKey("bcc") ? obj.getArray("bcc") : null;
            String subject = obj.getString("subject");
            String body = obj.getString("htmlBody");
            ReadableArray attachmentPaths = obj.getArray("attachmentPaths");
            ReadableArray attachmentNames = obj.getArray("attachmentNames");
            ReadableArray attachmentTypes = obj.getArray("attachmentTypes");

            @Override
            public void run() {
                try {
                    MailSender sender = new MailSender(username, password, mailhost, port, ssl);
                    sender.sendMail(subject, body, from, recipients, bcc, attachmentPaths, attachmentNames, attachmentTypes);

                    WritableMap success = new WritableNativeMap();
                    success.putString("status", "SUCCESS");
                    promise.resolve(success);
                } catch (Exception e) {
                    promise.reject("ERROR", e.getMessage());
                }
            }
        });
    }
}

class MailSender extends javax.mail.Authenticator {

    private String mailhost;
    private String user;
    private String password;
    private Session session;
    private String port;
    private Boolean ssl;
    private Multipart _multipart = new MimeMultipart();

    static {
        Security.addProvider(new JSSEProvider());
    }

    public MailSender(String user, String password, String mailhost, String port, Boolean ssl) {
        this.user = user;
        this.password = password;
        this.mailhost = mailhost;

        Properties props = new Properties();
        props.setProperty("mail.transport.protocol", "smtp");
        props.setProperty("mail.host", mailhost);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.socketFactory.port", port);
        if (ssl) {
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        } else {
            props.put("mail.smtp.starttls.enable", "true");
        }
        props.put("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.quitwait", "false");

        session = Session.getDefaultInstance(props, this);
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(user, password);
    }

    public synchronized void sendMail(String subject, String body, String sender, String recipients, ReadableArray bcc,
          ReadableArray attachmentPaths, ReadableArray attachmentNames, ReadableArray attachmentTypes) throws Exception {
        MimeMessage message = new MimeMessage(session);
        Transport transport = session.getTransport();
        BodyPart messageBodyPart = new MimeBodyPart();

        message.setFrom(new InternetAddress(sender, ""));
        message.setSubject(subject);
        message.setSentDate(new Date());

        messageBodyPart.setContent(body, "text/html; charset=utf-8");

        _multipart.addBodyPart(messageBodyPart);

        if (recipients.indexOf(',') > 0) {
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipients));
        } else {
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipients));
        }

        if (bcc != null) {
            for (int i = 0; i < bcc.size(); i++) {
                message.addRecipients(Message.RecipientType.BCC, bcc.getString(i));
            }
        }

        for (int i = 0; i < attachmentPaths.size(); i++) {
            messageBodyPart = new MimeBodyPart();
            DataSource source = new FileDataSource(attachmentPaths.getString(i));
            messageBodyPart.setDataHandler(new DataHandler(source));
            messageBodyPart.setFileName(attachmentNames.getString(i));
            if (attachmentTypes.getString(i) == "img") {
                messageBodyPart.setHeader("Content-ID", "<image>");
            }
            _multipart.addBodyPart(messageBodyPart);
            messageBodyPart = new MimeBodyPart();
        }

        message.setContent(_multipart);
        message.saveChanges();

        transport.send(message);
        transport.close();
    }
}

class JSSEProvider extends Provider {

    private static final long serialVersionUID = 1L;

    public JSSEProvider() {
        super("HarmonyJSSE", 1.0, "Harmony JSSE Provider");
        AccessController.doPrivileged(new java.security.PrivilegedAction<Void>() {
            public Void run() {
                put("SSLContext.TLS",
                      "org.apache.harmony.xnet.provider.jsse.SSLContextImpl");
                put("Alg.Alias.SSLContext.TLSv1", "TLS");
                put("KeyManagerFactory.X509",
                      "org.apache.harmony.xnet.provider.jsse.KeyManagerFactoryImpl");
                put("TrustManagerFactory.X509",
                      "org.apache.harmony.xnet.provider.jsse.TrustManagerFactoryImpl");
                return null;
            }
        });
    }
}