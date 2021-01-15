import React from "react"
import { View, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Feed = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <Text>Feed</Text>
    </View>
  )
}

export default Feed
