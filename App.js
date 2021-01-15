import { StatusBar } from "expo-status-bar"
import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"

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

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers/index"
import thunk from "redux-thunk"

import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import LoginScreen from "./components/auth/Login"
import MainScreen from "./components/Main"
import AddScreen from "./components/main/Add"
import SaveScreen from "./components/main/Save"

const Stack = createStackNavigator()

const store = createStore(rootReducer, applyMiddleware(thunk))

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
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Save" component={SaveScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
