import React, { useState } from "react"
import { SafeAreaView, Button, TextInput } from "react-native"
import firebase from "firebase"
import "firebase/firestore"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          })
        console.log(result)
      })
      .catch((error) => console.log(error))
  }

  return (
    <SafeAreaView>
      <TextInput placeholder="Name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign Up" onPress={() => onSignUp()} />
    </SafeAreaView>
  )
}

export default Register
