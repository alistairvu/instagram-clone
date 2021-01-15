import React from "react"
import { View, Text, Image, FlatList, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSelector } from "react-redux"

const Profile = () => {
  const insets = useSafeAreaInsets()
  const currentUser = useSelector(({ userState }) => userState.currentUser)
  const posts = useSelector(({ userState }) => userState.posts)

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
