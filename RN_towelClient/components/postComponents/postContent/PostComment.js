import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostReply from './PostReply'
import { getResponse } from '../../../axios/axios'
import { useRoute } from '@react-navigation/native'

export default function PostComment({ postID, postCommentData, getUsecommentData,setGetReplyToReply,getReplyToReplyDataState }) {
    const route = useRoute()
    const [data, setdata] = useState([])
    useEffect(() => {
        (route.name === 'postContent') ? setdata(postCommentData) : setdata(getUsecommentData);
    }, [postCommentData, getUsecommentData, data])
    return (
        <ScrollView style={{marginTop:24,}}>
            {data.map((item, index) => (
                <View style={styles.postComment} key={index}>
                    <View style={styles.postCommentHeader}>
                        <View style={styles.postCommentHeaderImageAndName}>
                            <Image source={require('../../../assets/icon.png')} style={styles.postCommentHeaderImage}></Image>{/* 由于不能正常显示头像使用icon代替 */}
                            <Text>{item.users[0].username}</Text>
                        </View>
                        <Text>...</Text>
                    </View>
                    <Text>
                        {item.commentText}
                    </Text>
                    {/* 
                 <View style={styles.postCommentButtonS}>
                    <Image style={styles.postCommentButton} source={require('../../../assets/icon.png')}></Image>
                    <Image style={styles.postCommentButton} source={require('../../../assets/icon.png')}></Image>
                    <Image style={styles.postCommentButton} source={require('../../../assets/icon.png')}></Image>
                </View> 
                */}
                    <PostReply postCommentId={item._id} setGetReplyToReply={setGetReplyToReply} postID={postID} getReplyToReplyDataState={getReplyToReplyDataState}></PostReply>
                </View>

            ))}
            <View style={{ height: 50 }}></View>{/* 解决最低下的comment会被postInput组件阻挡问题：在最底下的comment 
            添加一个和postInput组件一样宽的View */}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    postComment: {
        borderRadius: 10,
        
        width: '90%',
        backgroundColor: 'gray',
        height: 'auto',
        marginHorizontal: 'auto',
        padding: 8,
        rowGap: 8,
        marginBottom: 16,
    },
    postCommentHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
    },
    postCommentHeaderImageAndName: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    postCommentHeaderImage: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    /*  postCommentButtonS:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-around'
     },
     postCommentButton: {
         width: 60,
         height: 60,
         borderRadius: 10,
     } */
})