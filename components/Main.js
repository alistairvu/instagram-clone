import React, { useState, useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../redux/actions/index"

const Main = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userState.currentUser)
  console.log(currentUser)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  if (currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>{currentUser.name} is logged in</Text>
      </View>
    )
  } else {
    return <View></View>
  }
}

export default Main
