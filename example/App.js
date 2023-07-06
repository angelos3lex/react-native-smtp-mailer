

import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import RNSmtpMailer from "react-native-mailtest";
import RNFS from "react-native-fs";


const App =()=>{
  const titleButton = "mail-gönder"
  const sendEmail = () => {
    RNSmtpMailer.sendMail({
      mailhost: "smtp.office365.com",
      port: "587",
      ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
      username: "slymanmrcan@gmail.com",
      password: "1995.Mercan",
      recipients: "valogemesup@gmail.com",
      subject: "subject",
      htmlBody: "<h1>header</h1><p>body</p>",
      attachmentPaths: ["pathToFile1.png","pathToFile2.txt","pathToFile3.csv"],
      attachmentNames: ["image.jpg", "firstFile.txt", "secondFile.csv"],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
    })
      .then(success => console.log("başarılı",success))
      .catch(err => console.log("bir sorun oluştu",err));
      
  };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Smtp Mailer!</Text>
        <Button title={titleButton} onPress={sendEmail} />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default App