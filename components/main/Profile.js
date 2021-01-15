import React, { useState, useEffect } from "react"
import { View, Text, Image, FlatList, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import firebase from "firebase"
import "firebase/firestore"

const Profile = (props) => {
  const currentUser = useSelector(({ userState }) => userState.currentUser)
  const posts = useSelector(({ userState }) => userState.posts)
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUserPosts(posts)
      setUser(currentUser)
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log(snapshot.data())
            setUser(snapshot.data())
          } else {
            console.log("does not exist")
          }
        })

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          const posts = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setUserPosts(posts)
        })
    }
  }, [props.route.params.uid])

  if (user === null) {
    return <View></View>
  }

  console.log(user)
  console.log(userPosts)

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
})

export default Profile
