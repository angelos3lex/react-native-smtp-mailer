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

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

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

create a Podfile with `pod init` and add (or just add it on your existing Podfile):
```
pod 'mailcore2-ios'
pod install
```

Then, in RNSmtpMailer.xcodeproj, in build settings, in Header Search Paths, add:
```
$(SRCROOT)/../../../ios/Podsmailcore2-ios 
```

## Usage

```javascript
import RNSmtpMailer from "react-native-smtp-mailer";

RNSmtpMailer.sendMail({
  mailhost: "smtp.gmail.com",
  port: "465",
  ssl: true,//if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
  username: "usernameEmail",
  password: "password",
  from: "fromEmail",
  recipients: "toEmail1,toEmail2",
  subject: "subject",
  htmlBody: "<h1>header</h1><p>body</p>",
  attachmentPaths: [
    RNFS.ExternalDirectoryPath + "/image.jpg",
    RNFS.DocumentDirectoryPath + "/test.txt",
    RNFS.DocumentDirectoryPath + "/test2.csv"
  ],
  attachmentNames: ["image.jpg", "firstFile.txt", "secondFile.csv"],
  attachmentTypes: ["img", "txt", "csv"]
})
  .then(success => console.log(success))
  .catch(err => console.log(err));
```
