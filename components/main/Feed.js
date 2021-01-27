import React, { useState, useEffect } from "react"
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native"
import { useSelector } from "react-redux"
import firebase from "firebase"
import "firebase/firestore"

const Feed = (props) => {
  const currentUser = useSelector(({ userState }) => userState.currentUser)
  const followingList = useSelector(({ userState }) => userState.following)
  const users = useSelector(({ usersState }) => usersState.users)
  const usersLoaded = useSelector(({ usersState }) => usersState.usersLoaded)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let posts = []
    if (usersLoaded === followingList.length) {
      for (let i = 0; i < followingList.length; i++) {
        const user = users.find((el) => el.uid === followingList[i])
        if (user !== undefined) {
          posts = [...posts, ...user.posts]
        }
      }
      posts.sort((x, y) => {
        return x.creation < y.creation
      })
      setPosts(posts)
    }
  }, [usersLoaded])

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
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

export default Feed
