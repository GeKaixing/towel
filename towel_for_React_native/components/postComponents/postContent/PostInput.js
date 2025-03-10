import { View, Text, Image, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '../../../storage/storage';
import axiosInstance from '../../../axios/axios';

export default function PostInput({ postID, getCommentsHandler, getReplyToReplyData ,setGetReplyToReplyState,getReplyToReplyDataState}) {
    const [postInputData, setPostInputData] = useState('');
    const [postSelectImageData, setSelectImageData] = useState(null);
    const [responseStaticUrl, setResponseStaticUrl] = useState(null)
    useEffect(() => {
        if (getReplyToReplyData!=='') {
            setPostInputData('@' + getReplyToReplyData?.item?.replyToreplyUser.username + ':')
        }
    }, [getReplyToReplyData])
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

    const sendCommentApi = async () => {
        try {
            const loginData = await storage.load({
                key: 'loginState',
                autoSync: true,
                syncInBackground: true,
            });
            const responseData = await axiosInstance({
                url: `addcomment/${postID}`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${loginData.jwt}`
                },
                data: {
                    data: {
                        commentUserId: loginData.userid,
                        Text: postInputData,
                        Image: responseStaticUrl,
                        Like: 0

                    }
                }
            });
            if (responseData.data) {
                setPostInputData('');
                getCommentsHandler();
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
            formData.append('staticType', 'comment');
            formData.append('file', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });


            const loginData = await storage.load({
                key: 'loginState',
                autoSync: true,
                syncInBackground: true,
            });

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
    const snedReplyTOReply = async () => {
        try {
            const loginData = await storage.load({
                key: 'loginState',
                autoSync: true,
                syncInBackground: true,
            });
            const responseData = await axiosInstance({
                url: `addreply`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${loginData.jwt}`
                },
                data: {
                    data: {
                        /* {"commentId": "663c7b223c74b563d8f6cbd2",
                        "item": {"__v": 0, "_id": "663c97333c74b563d8f6cc5e", "commentId": "663c7b223c74b563d8f6cbd2", "replyComment": null, "replyImages": null, "replyLike": 0, "replyText": "你好", 
                        "replyToreplyUser": {"__v": 0, "headimg": "http://127.0.0.1:4000/1eac4dd2-a292-4999-828d-ffa29c1fe1bc_test.png", "username": "test"},
                        replyToreplyUserId": "6620e7eb66984c681742e753", 
                        "replyUser": {"__v": 0, "headimg": "http://127.0.0.1:4000/1eac4dd2-a292-4999-828d-ffa29c1fe1bc_test.png", "username": "test"}, 
                        "replyUserId": "6620e7eb66984c681742e753"}, 
                        "postID": "663c7b0a3c74b563d8f6cbcd"} */
                        postID: getReplyToReplyData.postID,
                        commentId: getReplyToReplyData.item.commentId,
                        replyUserId: getReplyToReplyData.item.replyUserId,
                        replyToreplyUserId: getReplyToReplyData.item.replyToreplyUserId,
                        replyText: postInputData.replace(/@\w+:/g, ""),
                        replyImages: null,
                        replyLike: 0,
                        replyComment: null
                    }
                }
            })
            if(responseData.data){
                setGetReplyToReplyState(!getReplyToReplyDataState)
                setPostInputData('')
            }
            console.log()
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <View style={styles.postSelectImageS}>
                {postSelectImageData &&
                    <><Pressable onPress={() => setSelectImageData(null)}><Text>X</Text></Pressable>
                        <Image
                            style={styles.postSelectImage}
                            source={{ uri: postSelectImageData }}
                        ></Image>
                    </>
                }
            </View>
            <View style={styles.postInput}>
                <TextInput
                    style={styles.postTextInput}
                    value={postInputData}
                    onChangeText={(text) => setPostInputData(text)}
                />
                <Pressable style={styles.postSend} onPress={(getReplyToReplyData!=='') ? snedReplyTOReply : sendCommentApi}>
                    <Text>Send</Text>
                </Pressable>
                <Pressable style={styles.postSendImage} onPress={pickImageAsync}>
                    <Text>Image</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    postInput: {
        backgroundColor: 'gray',
        width: '90%',
        position: 'absolute',
        bottom: 0,
        height: 50,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        alignSelf: 'center',
    },
    postSelectImageS: {
        width: '90%',
        position: 'absolute',
        bottom: 58,
        alignSelf: 'center',
    },
    postSelectImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    postTextInput: {
        backgroundColor: 'red',
        width: '70%',
    },
    postSend: {
        flex: 1,
    },
    postSendImage: {
        flex: 1,
    },
});
