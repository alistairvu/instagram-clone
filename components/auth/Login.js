import React, { useState } from "react"
import { SafeAreaView, Button, TextInput } from "react-native"
import firebase from "firebase"
import "firebase/firestore"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
  }

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Log In" onPress={() => onLogin()} />
    </SafeAreaView>
  )
}

export default Login
