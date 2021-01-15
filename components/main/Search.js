import React, { useState } from "react"
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import firebase from "firebase"
import "firebase/firestore"
import { useNavigation } from "@react-navigation/native"

const Search = () => {
  const [users, setUsers] = useState([])
  const navigation = useNavigation()

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setUsers(users)
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Type Here"
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Result", { uid: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Search
