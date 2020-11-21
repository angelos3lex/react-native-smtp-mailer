
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
     * Alias of the username email address, to be shown in the recipients as the sender's email address.
     * By default it's the same as the username field
     * i.e: "foo.alias@foobar.com"
     * *Note:* If set, then the reply-to email address will be this one, and not the username email address
     */
    from?: string;

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
     * **Only for android**
     * If provided, the sending attachments filenames, will be renamed by these
     * i.e: ["renamed_sample_test.txt"]
     */
    attachmentNames?: Array<string>;
}

class SmtpMailer {
    public static sendMail(options: SmtpOptions): Promise<string> {
        return RNSmtpMailer.sendMail(options);
    }
}

export default SmtpMailer;
