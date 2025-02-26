import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getResponse } from '../../../axios/axios'
import { useRoute } from '@react-navigation/native'
export default function PostReply({ postCommentId, getUsereplyData, setGetReplyToReply, postID,getReplyToReplyDataState }) {
    const [postReplyData, setPostReplyData] = useState([])
    const route = useRoute()
    useEffect(() => {
        async function getPostReply() {
            try {
                const responseData = await getResponse({ url: `allreply/${postCommentId}` });
                setPostReplyData(responseData);
            } catch (error) {
                console.error(error);
            }
        }

        if (route.name === 'postContent') {
            getPostReply();
        } else {
            setPostReplyData(getUsereplyData);
        }
    }, [postCommentId, getUsereplyData, route.name,getReplyToReplyDataState]);
    const usePostReply = {
        borderRadius: 10,
        padding: 8,
        marginTop: 8,
        marginHorizontal: 'auto',
        width: '90%',
        backgroundColor: 'gray'
    }
    const containerStyle = (route.name === 'postContent') ? null : usePostReply
    const containerStyles = (route.name === 'postContent') ? null : { marginTop: 24 }

    return (
        <ScrollView style={containerStyles}>
            {postReplyData && postReplyData.map((item, index) => (
                <View style={[styles.postReply, containerStyle]} key={index}>
                    <Pressable onPress={() => setGetReplyToReply({
                        postID: postID,
                        item
                    })}>
                        <Text>
                            @{item.replyToreplyUser.username}:
                            {item.replyText}</Text>
                    </Pressable>

                    <Text>...</Text>
                </View>
            ))
            }

        </ScrollView >
    )
}
const styles = StyleSheet.create({
    postReply: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    },

})