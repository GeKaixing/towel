import React, { useEffect, useState } from 'react';
// import style from './PostComment.module.css';
import PostCommentButton from './PostCommentButton';
import { useLocation, useNavigate } from 'react-router';
import propTypes from 'prop-types'
import { getComment, getOnePost, postDelComment } from '../../../../services/post/post';
import DeleteBox from '../../../../components/DeleteBox';
import Date from '../../../../components/Date';
interface commentdata {
    _id: string,
    users: [{
        username: string,
        headimg: string,
        _id: string
    }],
    commentText: string,
    commentCreateDate: string,
    reply: number,
    postId: string,
    commentLike: number,
    replycontent: [{
        users: [{
            username: string,
            headimg: string,
            _id: string
        }]
    }]
}
export default function PostComment({ postId, setInputData, reLoad, userCommentData, setreloadUserlikes, reloadUserlikes }) {
    const [commentdata, setCommentData] = useState<commentdata[]>([]);
    // const [localStorageData] = useLocalStorage();
    const [targetID, setTargetID] = useState('');
    const useRoutes = useLocation();
    const navigate = useNavigate();
    const [reloadPostComment, seReLoadPostComment] = useState(false);

    useEffect(() => {
        if (useRoutes.pathname.split('/')[1] === 'postcontent') {
            getCommentApi();
        } else {
            setCommentData(userCommentData);
        }
    }, [reLoad, userCommentData, postId, reloadPostComment]);


    const getCommentApi = async () => {
        try {
            if (postId) {
                const response = await getComment(postId)
                setCommentData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = (commentId) => {
        postDelComment(commentId).then(() => {
            seReLoadPostComment(!reloadPostComment);
            setreloadUserlikes(!reloadUserlikes);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    const targetIDHandler = (id) => {
        if (targetID === id) {
            setTargetID('');
        } else {
            setTargetID(id);
        }
    }

    const getOnePostApi = (POSEID) => {
        getOnePost(POSEID).then((response) => {
            if(       response.data.length===0){
                return alert('文章已删除')
            }
            const data = JSON.stringify({ ...response.data, from: 'user' });
            navigate(`/postcontent/${POSEID}`, { state: data });
        })
            .catch((error) => {
                
                console.log(error);
            });
    };

    return (
        <div>
            {commentdata.length!==0?commentdata.map((item) => (
                <li key={item._id} className='flex flex-col p-2 border-2 rounded-my-rounded-10px mb-2 border-[--boxColor] hover:border-[--boxHoverColor]'>
                    <span className='flex justify-between mb-2'>
                        <div className='flex space-x-2 items-center'>
                            <img src={item.users[0].headimg} className='h-10 w-10 rounded-full' alt="user" />
                            <div onClick={() => setInputData('@' + item.users[0].username + ':')} className='font-bold text-[--fontColor]'>{item.users[0].username}</div>
                            <Date>{item.commentCreateDate}</Date>
                        </div>
                        <div onClick={() => targetIDHandler(item._id)} className='relative cursor-pointer' >...
                            {targetID === item._id &&
                                <DeleteBox postUserId={item.users[0]._id} deleteHandler={() => deleteHandler(item._id)}>
                                    {useRoutes.pathname.split('/')[1] !== 'homepage' ? (
                                        <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => getOnePostApi(item.postId)}>
                                            进入文章
                                        </span>
                                    ) : null}
                                    <span className=' cursor-pointer w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => setInputData({ targetName: '@' + item.users[0].username, commentid: item._id })}>
                                        回复{item.users[0].username}
                                    </span>
                                </DeleteBox>
                            }
                        </div>
                    </span>
                    <span className='whitespace-normal break-words text-[--fontColor] box-border'>{item.commentText}</span>
                    <div className=''>
                        <div className=''>
                            <PostCommentButton
                                replycount={item.reply}
                                reLoad={reLoad}
                                setInputData={setInputData}
                                commentName={item.users[0].username}
                                cid={item._id}
                                commentid={item._id}
                                replycontent={item.replycontent}
                                likes={item.commentLike}
                                reloadPostComment={reloadPostComment}
                                seReLoadPostComment={seReLoadPostComment}
                            ></PostCommentButton>
                        </div>
                    </div>
                </li>
            )):<div className='flex items-center justify-center font-bold'>暂无评论</div>}
        </div>
    );
}
PostComment.propTypes = {
    postId: propTypes.string,
    setInputData: propTypes.func,
    reLoad: propTypes.bool,
    userCommentData:propTypes.oneOfType([
        propTypes.object,
        propTypes.array
    ]),
    
    setreloadUserlikes: propTypes.func,
    reloadUserlikes: propTypes.bool,
}