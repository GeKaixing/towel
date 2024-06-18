import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PostReplyContent from '../../postComponents/postContent/PostReplyContent'
export default function UserReply({ localStorageData }) {
    const [userReplyData, setUserReplyData] = useState([]);
    const [reloadUserReply, setreloadUserReplys] = useState(false)
    useEffect(() => {
        if (localStorageData.userid) {
            axios({
                url: `http://127.0.0.1:4000/getusereply/${localStorageData.userid}`,
                headers: { 'Authorization': `Bearer ${localStorageData.jwt}` }
            })
                .then((response) => {
                    setUserReplyData(response.data)
                })
                .catch((error) => { console.log(error) })
        }
        else {
            setUserReplyData([])
        }
    }, [localStorageData,reloadUserReply])
    return (
        <PostReplyContent userReplyData={userReplyData} reloadUserReply={reloadUserReply} setreloadUserReplys={setreloadUserReplys}></PostReplyContent>
    )
}
