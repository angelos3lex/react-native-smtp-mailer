# react-native-smtp-mailer

## Getting started

`$ npm install react-native-smtp-mailer --save`

### Mostly automatic installation

`$ react-native link react-native-smtp-mailer`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-smtp-mailer` and add `RNSmtpMailer.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSmtpMailer.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.reactlibrary.RNSmtpMailerPackage;` to the imports at the top of the file
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

Then, in RNSmtpMailer.xcodeproj, in build settings, in Header Search Paths, add:

```
$(SRCROOT)/../../../ios/Pods/mailcore2-ios
```

## Usage

```javascript
import RNSmtpMailer from "react-native-smtp-mailer";

RNSmtpMailer.sendMail({
  mailhost: "smtp.gmail.com",
  port: "465",
  ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
  username: "usernameEmail",
  password: "password",
  from: "fromEmail",
  recipients: "toEmail1,toEmail2",
  bcc: ["bccEmail1", "bccEmail2"], //completely optional
  subject: "subject",
  htmlBody: "<h1>header</h1><p>body</p>",
  attachmentPaths: [
    RNFS.ExternalDirectoryPath + "/image.jpg",
    RNFS.DocumentDirectoryPath + "/test.txt",
    RNFS.DocumentDirectoryPath + "/test2.csv",
    RNFS.DocumentDirectoryPath + "/pdfFile.pdf",
    RNFS.DocumentDirectoryPath + "/zipFile.zip",
    RNFS.DocumentDirectoryPath + "/image.png"
  ],
  attachmentNames: [
    "image.jpg",
    "firstFile.txt",
    "secondFile.csv",
    "pdfFile.pdf",
    "zipExample.zip",
    "pngImage.png"
  ], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
  attachmentTypes: ["img", "txt", "csv", "pdf", "zip", "img"] //needed for android, in ios-only application, leave it empty: attachmentTypes:[]. Generally every img(either jpg, png, jpeg or whatever) file should have "img", and every other file should have its corresponding type.
})
  .then(success => console.log(success))
  .catch(err => console.log(err));
```

RNFS is from <a href="https://github.com/itinance/react-native-fs">react-native-fs</a> library, used just to demonstrate a way of accessing files in phone filesystem.

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
