# react-native-smtp-mailer

## Getting started

`$ npm install react-native-smtp-mailer --save`

*If you use RN version less than 0.60, then you need to link the native modules, either automatically or manually*
<details>
<summary> Link Instructions for RN versions less than 0.60 </summary>
	
#### Mostly automatic installation

`$ react-native link react-native-smtp-mailer`

#### Manual installation

##### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-smtp-mailer` and add `RNSmtpMailer.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSmtpMailer.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

##### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.rnsmtpmailer.RNSmtpMailerPackage;` to the imports at the top of the file
- Add `new RNSmtpMailerPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-smtp-mailer'
   project(':react-native-smtp-mailer').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-smtp-mailer/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     implementation project(':react-native-smtp-mailer')
   ```

</details>

## Extra steps
### Android
Maybe you need to add (if you encounter error with mimetypes during build), in <b><i>android/app/build.gradle:</i></b>

```
android {
	...
	packagingOptions {
		exclude 'META-INF/mimetypes.default'
		exclude 'META-INF/mailcap.default'
	}
}
```

### Ios

For iOS, inside ios folder, create a Podfile with `pod init` and add (or just add it on your existing Podfile):

```
pod 'mailcore2-ios'
```

Then run:

```
pod install
```

## Usage

```javascript
import RNSmtpMailer from "react-native-smtp-mailer";

RNSmtpMailer.sendMail({
  mailhost: "smtp.gmail.com",
  port: "465",
  ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
  username: "usernameEmail",
  password: "password",
  fromName: "Some Name", // optional
  replyTo: "usernameEmail", // optional
  recipients: "toEmail1,toEmail2",
  bcc: ["bccEmail1", "bccEmail2"], // optional
  subject: "subject",
  htmlBody: "<h1>header</h1><p>body</p>",
  attachmentPaths: [
    RNFS.ExternalDirectoryPath + "/image.jpg",
    RNFS.DocumentDirectoryPath + "/test.txt",
    RNFS.DocumentDirectoryPath + "/test2.csv",
    RNFS.DocumentDirectoryPath + "/pdfFile.pdf",
    RNFS.DocumentDirectoryPath + "/zipFile.zip",
    RNFS.DocumentDirectoryPath + "/image.png"
  ], // optional
  attachmentNames: [
    "image.jpg",
    "firstFile.txt",
    "secondFile.csv",
    "pdfFile.pdf",
    "zipExample.zip",
    "pngImage.png"
  ], // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
})
  .then(success => console.log(success))
  .catch(err => console.log(err));
```

RNFS is from <a href="https://github.com/itinance/react-native-fs">react-native-fs</a> library, used just to demonstrate a way of accessing files in phone filesystem.

# Documentation

#### `mailhost: string`

The smtp provider host. i.e: `"smtp.gmail.com"`

##### `port: string`

The port that the smtp provider listens to, i.e: `"465"`

#### username: string`

The username to authenticate with stmp host, i.e: `"foo@foobar.com"`

#### `password: string`

The password to authenticate with stmp host

#### `recipients: string`

Comma separated values if want to add multiple recipients i.e: `"foo@bar.com,bar@foo.com"`

#### `subject: string`

The subject of the email

#### `htmlBody: string`

The body of the email. i.e: `"<h1>Sample Header</h1><p>Lorem ipsum dolor sit amet...</p>"`

#### `fromName?: string`

Alias of the username email address, to be shown in the recipients as the sender's name. By default it's the same as the username field i.e: `"foo.alias@foobar.com"` *Note:* This is different than the reply-to email address. If reply-to is not specified, the reply-to will still use the username email

#### `replyTo?: string`

If not specified, the reply-to email is the username one i.e: `"fooReply@foobar.com"`

#### `ssl?: boolean`

In iOS TLS/SSL is determined automatically, so either true or false, it doesn't affect it

By default it is true in android. If false then TLS is enabled.

#### `bcc?: Array<string>`

Optional list of bcc emails i.e: `["foo@bar.com", "bar@foo.com"]`

#### `attachmentPaths?: Array<string>`

Optional path URIs of files that exist to the filesystem in the specified path, and want to be send as attachments i.e: `[RNFS.DocumentDirectoryPath + "/sample_test.txt"]`

#### `attachmentNames?: Array<string>`

**Required if attachmentPaths are set, Only for android**
The sending attachments filenames, will be renamed by these. It's important to set these, otherwise they are not always shown in the received email i.e: `["renamed_sample_test.txt"]` or `["sample_test.txt"]` etc

### Usage with Proguard

Add the following into android/app/proguard-rules.pro

```
-dontshrink
-keep class javax.** {*;}
-keep class com.sun.** {*;}
-keep class myjava.** {*;}
-keep class org.apache.harmony.** {*;}
-dontwarn java.awt.**
-dontwarn java.beans.Beans
-dontwarn javax.security.**
-dontwarn javax.activation.**
```
