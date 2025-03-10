import { View, TextInput, Image, StyleSheet, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import axiosInstance from '../../axios/axios'
export default function PostHeader({inputTextData,setInputTextData,searchInputText}) {
  
    return (
        <View style={styles.postHeader}>
            <TextInput style={styles.input} value={inputTextData} onChangeText={(text) => { setInputTextData(text) }}></TextInput>
            <Pressable style={styles.image} onPress={searchInputText}>
                <Text style={styles.button}>搜索</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    postHeader: {
        marginHorizontal: 'auto',
        display: 'flex',
        width: '90%',
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
    ,
    input: {
        width: 300,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'gray'
    },
    image: {
        width: 80,
        height: 60,
        borderBlockColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    button: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})