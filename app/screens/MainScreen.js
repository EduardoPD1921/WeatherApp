import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MainScreen = () => {
  return (
    <View>
      <Text style={styles.test}>Hyderabad</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  test: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 40,
    color: 'black'
  }
})

export default MainScreen