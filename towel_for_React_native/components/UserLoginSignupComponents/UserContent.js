import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useContext, useEffect, useState,useMemo } from 'react';
import PostContext from '../postComponents/PostContext';
import PostComment from '../postComponents/postContent/PostComment';
import PostReply from '../postComponents/postContent/PostReply';
import { getloginData } from '../../axios/axios';
import axiosInstance from '../../axios/axios';
import { dispatchs } from '../../context/context';

export default function Usercontent() {
    const dispatch = useContext(dispatchs);
    const [getUsePostData, setGetUsePostData] = useState([]);
    const [getUsecommentData, setGetUsecommentData] = useState([]);
    const [getUsereplyData, setGetUsereplyData] = useState([]);
    const [storageData, setStorageData] = useState('');
    const [activeComponent, setActiveComponent] = useState('');

    useEffect(() => {
        const getusepostDataHandler = async () => {
            try {
                const storageData = await getloginData();
                setStorageData(storageData.username);
                const getusepostDatas = await axiosInstance({
                    url: `getusepost/${storageData.userid}`,
                    headers: {
                        'Authorization': `Bearer ${storageData.jwt}`
                    }
                });
                setGetUsePostData(getusepostDatas.data);
            } catch (error) {
                console.log(error);
            }
        };
        getusepostDataHandler();
    }, []);

    const selectComponentContentHandler = async () => {
        try {
            const storageData = await getloginData();
            const getusepostDatas = await axiosInstance({
                url: `getusepost/${storageData.userid}`,
                headers: {
                    'Authorization': `Bearer ${storageData.jwt}`
                }
            });
            setGetUsePostData(getusepostDatas.data);
            setActiveComponent('context');
        } catch (error) {
            console.log(error);
        }
    };

    const selectComponentCommentHandler = async () => {
        try {
            const storageData = await getloginData();
            const getusecommentDatas = await axiosInstance({
                url: `getusecomment/${storageData.userid}`,
                headers: {
                    'Authorization': `Bearer ${storageData.jwt}`
                }
            });
            setGetUsecommentData(getusecommentDatas.data);
            setActiveComponent('comment');
        } catch (error) {
            console.log(error);
        }
    };

    const selectComponentReplyHandler = async () => {
        try {
            const storageData = await getloginData();
            const getusereplyDatas = await axiosInstance({
                url: `getusereply/${storageData.userid}`,
                headers: {
                    'Authorization': `Bearer ${storageData.jwt}`
                }
            });
            setGetUsereplyData(getusereplyDatas.data);
            setActiveComponent('reply');
        } catch (error) {
            console.log(error);
        }
    };

    const selectedComponent = useMemo(() => {
        switch (activeComponent) {
            case 'context':
                return <PostContext getUsePostData={getUsePostData} />;
            case 'comment':
                return <PostComment getUsecommentData={getUsecommentData} />;
            case 'reply':
                return <PostReply getUsereplyData={getUsereplyData} />;
            default:
                return <PostContext getUsePostData={getUsePostData} />;
        }
    }, [activeComponent, getUsePostData, getUsecommentData, getUsereplyData]);


    return (
        <>
            <View style={styles.user}>
                <View style={styles.userHeader}>
                    <View style={styles.userHeaderImageName}>
                        <Image style={styles.image} source={require('../../assets/icon.png')} />
                        <Text style={{fontSize:26,fontWeight:'bold'}}>{storageData}</Text>
                    </View>
                    <Pressable style={styles.userHeaderButton}
                        onPress={() => dispatch({ type: 'setiInitUserData', payload: null })}
                    >
                        <Text>退出登录</Text>
                    </Pressable>
                </View>
                <View style={styles.userSelect}>
                    <Pressable style={styles.userSelectButton} onPress={selectComponentContentHandler}><Text>post</Text></Pressable>
                    <Pressable style={styles.userSelectButton} onPress={selectComponentCommentHandler}><Text>comment</Text></Pressable>
                    <Pressable style={styles.userSelectButton} onPress={selectComponentReplyHandler}><Text>reply</Text></Pressable>
                </View>
            </View>
            {selectedComponent}
        </>
    );
}

const styles = StyleSheet.create({
    user: {
        marginTop: 8,
        width: '90%',
        marginHorizontal: 'auto',
    },
    userHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userHeaderImageName: {
        display: 'flex',
        flexDirection: 'row',
        columnGap:8,
        alignItems: 'center',
    },
    userHeaderButton: {
        width: 60,
        height: 20,
        backgroundColor: 'gray',
        borderRadius: 3,
    },
    userSelect: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userSelectButton: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width: 60,
        height: 30,
        backgroundColor: 'gray',
        borderRadius:10,
    },
    image: {
        width: 60,
        height: 60,
        borderBlockColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
});
