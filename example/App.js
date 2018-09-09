/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import RNSmtpMailer from "react-native-smtp-mailer";
import RNFS from "react-native-fs";

export default class App extends Component {
  toastShow = () => {
    RNSmtpMailer.show("dummy message", RNSmtpMailer.SHORT)
      .then(val => {
        console.log(val);
      })
      .catch(err => console.log(err));
  };
  sendEmail = () => {
    RNSmtpMailer.sendMail({
      mailhost: "smtp.gmail.com",
      port: "465",
      ssl: true, //if ssl: false, TLS is enabled
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
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Smtp Mailer!</Text>
        <Button title="Send Email" onPress={this.sendEmail} />
      </View>
    );
  }
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
