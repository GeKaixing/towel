import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import PostComment from './PostComment'
import PostInput from './PostInput'
import { getResponse } from '../../../axios/axios';

export default function PostContent({ route }) {
    const item = route.params;
    const [postCommentData, setPostCommentData] = useState([])
    const getComments = async () => {
        try {
            const responseData = await getResponse({ url: `comment/${item._id}` })
            setPostCommentData(responseData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getComments()
    }, [item._id])
    const [getReplyToReplyData, setGetReplyToReply] = useState('')/* @回复的状态 */
    const [getReplyToReplyDataState, setGetReplyToReplyState]=useState(false)
    return (
        <>
            <ScrollView>
                <View style={styles.postContent}>
                    <View style={styles.postContentHeader}>
                        <View style={styles.postContentHeaderImageAndName}>
                            <View>
                                <Image style={styles.postContentHeaderImage} source={require('../../../assets/icon.png')}></Image>{/* 由于不能正常显示头像使用icon代替 */}
                            </View>
                            <View>
                                <Text>{item.user.username}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>...</Text>
                        </View>
                    </View>
                    <View>
                        <Text>
                            {item.postText}
                        </Text>
                    </View>
                    <View style={styles.postCotentButtonS}>
                        <Pressable style={styles.postCotentButtonPressable}>
                            <Image style={styles.postCotentButton} source={require('../../../assets/icon.png')}></Image>
                            <Text>{item.postShare}</Text>
                        </Pressable>
                        <Pressable style={styles.postCotentButtonPressable}>
                            <Image style={styles.postCotentButton} source={require('../../../assets/icon.png')}></Image>
                            <Text>{item.postLike}</Text>
                        </Pressable>
                        <Pressable style={styles.postCotentButtonPressable}>
                            <Image style={styles.postCotentButton} source={require('../../../assets/icon.png')}></Image>
                            <Text>{item.postComment}</Text>
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.postContentCommentText}>评论</Text>
                <PostComment postID={item._id} postCommentData={postCommentData} setGetReplyToReply={setGetReplyToReply} getReplyToReplyDataState={getReplyToReplyDataState}></PostComment>
            </ScrollView>
            <PostInput postID={item._id} getCommentsHandler={getComments} getReplyToReplyData={getReplyToReplyData} setGetReplyToReplyState={setGetReplyToReplyState} getReplyToReplyDataState={getReplyToReplyDataState}></PostInput>
        </>
    )
}
const styles = StyleSheet.create({
    postCotentButtonPressable: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 8
    },
    postContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        marginHorizontal: 'auto',
        marginTop: 8,
        backgroundColor: 'gray',
        padding: 8,
        rowGap: 8,
    },
    postContentHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    postContentHeaderImageAndName: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 8,
    },
    postContentHeaderImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    postContentCommentText: {
        width: '90%',
        fontSize: 16,
        marginHorizontal: 'auto',
        fontWeight: 'bold',
        color: 'black',

    },
    postCotentButtonS: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    postCotentButton: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
})