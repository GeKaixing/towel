import React, { useEffect, useState } from 'react';
// import style from './PostComment.module.css';
import PostCommentButton from './PostCommentButton';
import { useLocation, useNavigate } from 'react-router';
import propTypes from 'prop-types'
import { getComment, getOnePost, postDelComment } from '../../../../services/post/post';
import DeleteBox from '../../../../components/DeleteBox';
export default function PostComment({ postId, setInputData, reLoad, userCommentData, setreloadUserlikes, reloadUserlikes }) {
    const [commentdata, setCommentData] = useState([]);
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
            const data = JSON.stringify({ ...response.data, from: 'user' });
            navigate(`/postcontent/${POSEID}`, { state: data });
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {commentdata.map((item) => (
                <li key={item._id} className='flex flex-col p-2 border-2 rounded-my-rounded-10px mb-2 border-[--boxColor] hover:border-[--boxHoverColor]'>
                    <span className='flex justify-between mb-2'>
                        <div className='flex space-x-2 items-center'>
                            <img src={item.users[0].headimg} className='h-10 w-10 rounded-full' alt="user" />
                            <div onClick={() => setInputData('@' + item.users[0].username + ':')} className='font-bold'>{item.users[0].username}</div>
                        </div>
                        <div onClick={() => targetIDHandler(item._id)} className='relative' >...
                            {targetID === item._id &&
                                <DeleteBox postUserId={item.users[0]._id} deleteHandler={() => deleteHandler(item._id)}>
                                    {useRoutes.pathname.split('/')[1] !== 'homepage' ? (
                                        <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => getOnePostApi(item.postId)}>
                                            进入文章
                                        </span>
                                    ) : null}
                                    <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => setInputData({ targetName: '@' + item.users[0].username, commentid: item._id })}>
                                        回复{item.users[0].username}
                                    </span>
                                </DeleteBox>
                            }
                        </div>
                    </span>
                    <span className='ml-5'>{item.commentText}</span>
                    <div className=''>
                        <div className=''>
                            <PostCommentButton
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
            ))}
        </div>
    );
}
PostComment.propTypes = {
    postId: propTypes.string,
    setInputData: propTypes.func,
    reLoad: propTypes.bool,
    userCommentData: propTypes.object,
    setreloadUserlikes: propTypes.func,
    reloadUserlikes: propTypes.bool,
}