
import { View, Text, Pressable, StyleSheet, TextInput,Image} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axiosInstance from '../axios/axios';
import storage from '../storage/storage';
export default function Add() {
    /* 添加了不会刷新主页 */
    const [textInputData, setTextInputData] = useState('')
    const [addSelectImageData, setSelectImageData] = useState('');
    const [responseData, setResponseData] = useState('');
    const getloginData = async () => {
        try {
            const loginData = await storage.load({
                key: 'loginState',
                autoSync: true,
                syncInBackground: true,
            });
            return loginData;
        } catch (error) {
            console.log(error)
        }
    }
    const pickImageAsync = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                quality: 1,
            });
            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setSelectImageData(uri);
                sendFormDataApi(uri);
            } else {
                alert('You did not select any image.');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const sendFormDataApi = async (uri) => {
        try {
            const uriParts = uri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            const formData = new FormData();
            formData.append('targetId', postID);
            formData.append('staticType', 'add');
            formData.append('file', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });

            const loginData = await getloginData()
            const response = await axiosInstance({
                url: `upload/${loginData.userid}`,
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${loginData.jwt}`,
                }
            });
            setResponseStaticUrl(response.data.staticUrl);
        } catch (error) {
            console.log(error);
        }
    };
    const addPostHandler = async () => {
        try {
            const loginData = await getloginData()
            const response = await axiosInstance({
                url: `addpost`,
                method: 'post',
                data: {
                    data: {
                        UserId: loginData.userid,
                        Text: textInputData,
                        Images: addSelectImageData,
                        Share: 0,
                        Like: 0,
                        Comment: 0
                    }
                },
                headers: {
                    'Authorization': `Bearer ${loginData.jwt}`,
                }
            });
            setResponseData(response.data)
        } catch (error) { console.log(error) }

    }
    return (
        <View style={styles.add}>
            <View style={styles.addText}>
                <TextInput value={textInputData} onChangeText={(text) => setTextInputData(text)}>
                </TextInput>
            </View>
            <View style={styles.addBottom}>
                <Pressable style={styles.addBottomPressable} onPress={addPostHandler}>
                    <Text>
                        添加
                    </Text>
                </Pressable>
                <Pressable style={styles.addBottomPressable} onPress={pickImageAsync}>
                    <Text>
                        图片
                    </Text>
                </Pressable>
            </View>
            <View style={styles.addImageS}>
                {addSelectImageData &&
                    <><Pressable onPress={() => setSelectImageData('')}><Text>X</Text></Pressable>
                        <Image
                            style={styles.addImage}
                            source={{ uri: addSelectImageData }}
                        ></Image>
                    </>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    add: {
        marginTop: 8,
        width: '90%',
        height: 200,
        marginHorizontal: 'auto',
        display: 'flex',
        rowGap: 8,
    },
    addText: {
        width: '100%',
        height: 200,
        backgroundColor: 'gray'
    },
    addBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    addBottomPressable: {
        width: 50,
        height: 50,
        backgroundColor: 'gray',

    },
    addImageS: {
        width: '90%',
        alignSelf: 'center',
    },
    addImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
})