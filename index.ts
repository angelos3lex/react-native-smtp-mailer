
import { NativeModules } from 'react-native';

const { RNSmtpMailer } = NativeModules;

export interface SmtpOptions {
    /**
     * The smtp provider host. i.e: "smtp.gmail.com"
     */
    mailhost: string;

    /**
     * The port that the smtp provider listens to, i.e: "465"
     */
    port: string;

    /**
     * The username to authenticate with stmp host, i.e: "foo@foobar.com"
     */
    username: string;

    /**
     * The password to authenticate with stmp host
     */
    password: string;

    /**
     * Comma separated values if want to add multiple recipients
     * i.e: "foo@bar.com,bar@foo.com"
     */ 
    recipients: string; 
    
    /**
     * The subject of the email
     */
    subject: string;

    /**
     * The body of the email.
     * i.e:
     * <h1>Sample Header</h1><p>Lorem ipsum dolor sit amet...</p>
     */
    htmlBody: string;

    /**
     * Alias of the username email address, to be shown in the recipients as the sender's name.
     * By default it's the same as the username field
     * i.e: "foo.alias@foobar.com"
     * *Note:* This is different than the reply-to email address. If reply-to is not specified, the reply-to will still use the username email
     */
    fromName?: string;

    /**
     * If not specified, the reply-to email is the username one
     * i.e: "fooReply@foobar.com"
     */
    replyTo?: string;

    /**
     * In iOS TLS/SSL is determined automatically, so either true or false, it doesn't affect it
     * 
     * By default it is true in android. If false then TLS is enabled.
     */ 
    ssl?: boolean;

    /**
     * Optional list of bcc emails
     * i.e: ["foo@bar.com", "bar@foo.com"]
     */
    bcc?: Array<string>;

    /**
     * Optional path URIs of files that exist to the filesystem in the specified path, and want to be send as attachments
     * i.e: [RNFS.DocumentDirectoryPath + "/sample_test.txt"]
     */
    attachmentPaths?: Array<string>;

    /**
     * **Required if attachmentPaths are set, Only for android**
     * The sending attachments filenames, will be renamed by these. It's important to set these, otherwise they are not always shown in the received email
     * i.e: ["renamed_sample_test.txt"] or ["sample_test.txt"] etc
     */
    attachmentNames?: Array<string>;
}

class SmtpMailer {
    public static sendMail(options: SmtpOptions): Promise<string> {
        return RNSmtpMailer.sendMail(options);
    }
}

export default SmtpMailer;
