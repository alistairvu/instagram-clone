import React, { useState } from "react"
import { View, TextInput, Image, Text, Button } from "react-native"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/firebase-storage"
import { useNavigation } from "@react-navigation/native"

const Save = (props) => {
  const [caption, setCaption] = useState("")
  const navigation = useNavigation()

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        navigation.popToTop()
      })
  }

  const uploadImage = async () => {
    const uri = props.route.params.image
    const response = await fetch(uri)
    const blob = await response.blob()

    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob)

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot)
        console.log(snapshot)
      })
    }

    const taskError = (snapshot) => {
      console.log(snapshot)
    }

    task.on("state_changed", taskProgress, taskError, taskCompleted)
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.route.params.image }}
        style={{ aspectRatio: 1 }}
      />
      <TextInput
        placeholder={"Write a Caption..."}
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  )
}

export default Save
