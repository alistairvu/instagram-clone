import { StatusBar } from "expo-status-bar"
import React, { useState, useEffect } from "react"
import { View, Text, Button } from "react-native"

import * as firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyBXZvhE8C0cZURyI2hx-Na9r1ueSU8dJXo",
  authDomain: "instagram-clone-6ed96.firebaseapp.com",
  projectId: "instagram-clone-6ed96",
  storageBucket: "instagram-clone-6ed96.appspot.com",
  messagingSenderId: "182331124843",
  appId: "1:182331124843:web:4c70a894629fcfd3add52e",
  measurementId: "G-9QSHFDM9RL",
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import LoginScreen from "./components/auth/Login"

const Stack = createStackNavigator()

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false)
        setLoaded(true)
      } else {
        setLoggedIn(true)
        setLoaded(true)
      }
    })
  }, [])

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User is logged in</Text>
      <Button
        title="Sign out"
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              setLoaded(false)
              setLoggedIn(false)
            })
            .catch((error) => console.log(error))
        }}
      />
    </View>
  )
}

export default App
