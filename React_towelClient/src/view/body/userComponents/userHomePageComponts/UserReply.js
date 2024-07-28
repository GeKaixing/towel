import React, { useEffect, useState } from 'react'
import PostReplyContent from '../../postComponents/postContent/PostReplyContent'
import propTypes from 'prop-types'
import { getUseReply } from '../../../../services/user/user';
function UserReply({ localStorageData }) {
    const [userReplyData, setUserReplyData] = useState([]);
    const [reloadUserReply, setreloadUserReplys] = useState(false)
    useEffect(() => {
        if (localStorageData.userid) {
            getUseReply(localStorageData.userid).then((response) => {
                setUserReplyData(response.data)
            })
                .catch((error) => { console.log(error) })
        }
        else {
            setUserReplyData([])
        }
    }, [localStorageData, reloadUserReply])
    return (
        <PostReplyContent userReplyData={userReplyData} reloadUserReply={reloadUserReply} setreloadUserReplys={setreloadUserReplys}></PostReplyContent>
    )
}
UserReply.propTypes = {
    localStorageData: propTypes.shape({
        userid: propTypes.string.isRequired, // userid 必须是字符串并且是必填项
        jwt: propTypes.string.isRequired     // jwt 必须是字符串并且是必填项
    }).isRequired  // localStorageData 必须是对象并且是必填项
};
export default UserReply;