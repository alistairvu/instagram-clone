import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUser,
  fetchUserFollowing,
  fetchUserPosts,
  clearData,
} from "../redux/actions/index"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import firebase from "firebase"

import FeedScreen from "./main/Feed"
import ProfileScreen from "./main/Profile"
import SearchScreen from "./main/Search"

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
  return null
}

const Main = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ userState }) => userState.currentUser)

  useEffect(() => {
    dispatch(clearData())
    dispatch(fetchUser())
    dispatch(fetchUserPosts())
    dispatch(fetchUserFollowing())
  }, [])

  if (currentUser) {
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
          <Tab.Screen
            name="Feed"
            component={FeedScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="magnify"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="New"
            component={EmptyScreen}
            listeners={({ navigation }) => ({
              tabPress: (event) => {
                event.preventDefault()
                navigation.navigate("Add")
              },
            })}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            listeners={({ navigation }) => ({
              tabPress: (event) => {
                event.preventDefault()
                navigation.navigate("Profile", {
                  uid: firebase.auth().currentUser.uid,
                })
              },
            })}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    )
  } else {
    return <View></View>
  }
}

export default Main
