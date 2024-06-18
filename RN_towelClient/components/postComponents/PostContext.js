import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios, { getloginData } from '../../axios/axios'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function PostContext({ getUsePostData, responseFilterData }) {
    const [responseData, setResponseData] = useState([])
    const navigate = useNavigation();
    const route = useRoute()
    useEffect(() => {
        if (route.name === 'post') {
            axios({
                url: 'post'
            }).then((data) => {
                setResponseData(data.data)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            setResponseData(getUsePostData)
        }
    }, [responseData, setResponseData, axios, route, route.name, getUsePostData])
    const postLikeApi = async (_id) => {
        try {
            const { jwt, userid } = await getloginData()
            const responseData = await axios({
                url: `post/like/${_id}`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                data: {
                    data: {
                        userId: userid
                    }
                }
            })
            console.log(responseData)
        } catch (error) { console.log('您已经点过了哦') }
    }
    return (
        (responseFilterData || responseData).map((item, index) => (
            <TouchableOpacity onPress={() => navigate.navigate('postContent', item)} >
                <View style={styles.postContext} key={index}>
                    <View style={styles.postcontexHeader}>
                        <View style={styles.postcontexHeaderAndName}>
                            <Image style={styles.postContextHeaderImage} source={require('../../assets/icon.png')}></Image>{/* 由于不能正常显示头像使用icon代替 */}
                            <Text style={styles.postContextHeaderName}>{item.user.username}</Text>
                        </View>
                        <View>
                            <Image style={styles.Image} source={require('../../assets/icon.png')}></Image>{/* more the icon */}
                        </View>
                    </View>
                    <View style={styles.postcontextText}>
                        <Text style={styles.PressableButtonText}>{item.postText}</Text>
                    </View>
                    <View style={styles.postcontextBottom}>
                        <Pressable style={styles.PressableButton} >
                            <Image style={styles.Image} source={require('../../assets/icon.png')}></Image>
                            <Text style={styles.PressableButtonText}>{item.postShare}</Text>
                        </Pressable>
                        <Pressable style={styles.PressableButton} onPress={()=>postLikeApi(item._id)}>
                            <Image style={styles.Image} source={require('../../assets/icon.png')}></Image>
                            <Text style={styles.PressableButtonText}>{item.postLike}</Text>
                        </Pressable>
                        <Pressable style={styles.PressableButton}>
                            <Image style={styles.Image} source={require('../../assets/icon.png')}></Image>
                            <Text style={styles.PressableButtonText}>{item.postComment}</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableOpacity>
        ))
    )
}
const styles = StyleSheet.create({
    postContextHeaderName: {
        fontSize: 20,
        fontWeight: 'blod'
    },
    PressableButtonText: {
        fontSize: 20,
        fontWeight: 'heavy'
    },
    PressableButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    postContext: {
        borderRadius: 10,
        padding: 8,
        marginHorizontal: 'auto',
        width: '90%',
        height: 'auto',
        backgroundColor: 'gray',
        marginTop: 24,
        display: 'flex',
        rowGap: 8,
        justifyContent: 'space-between'
    },
    postcontexHeader: {
        width: '100%',
        marginTop: 8,
        backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40
    },
    postcontexHeaderAndName: {
        width: null,
        height: null,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    /*  postContextHeaderImageView: {
         borderStyle: 'solid',
         borderWidth: 1,
         borderBlockColor: 'black',
     }, */
    postContextHeaderImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    postcontextText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        textAlignVertical: 'center',
        flex: 1,
        width: '100%',
        height: null,
        marginTop: 8,
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    postcontextBottom: {
        width: '100%',
        height: 'auto',
        marginTop: 8,
        backgroundColor: 'gray',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    Image: {
        width: 40,
        height: 40,
        borderBlockColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    }
})