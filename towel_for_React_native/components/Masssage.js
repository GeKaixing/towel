import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Masssage() {
  return (
    <View style={styles.Masssage}>
      <View style={styles.MasssageName}>
        <Image style={styles.image} source={require('../assets/icon.png')}></Image>
        <Text>name</Text>
      </View>
      <Text style={styles.MasssageButton}>test</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  Masssage: {
    borderRadius: 10,
    padding:8,
    marginTop: 8,
    width: '90%',
    marginHorizontal: 'auto',
    height: null,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "gray"
  },
  MasssageName: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  MasssageButton: {
    backgroundColor: 'gray'
  },
  image: {
    width: 60,
    height: 60,
    borderBlockColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'

  }
})