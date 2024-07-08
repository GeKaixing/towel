import React, { useEffect, useRef, useState } from 'react';
import style from './PostComment.module.css';
import PostCommentButton from './PostCommentButton';
import { useLocation, useNavigate } from 'react-router';
import propTypes from 'prop-types'
import useLocalStorage from '../../../../hooks/useLocaStorage';
import { getComment, getOnePost, postDelComment } from '../../../../services/post/post';
export default function PostComment({ postId, setInputData, reLoad, userCommentData, setreloadUserlikes, reloadUserlikes }) {
    const [commentdata, setCommentData] = useState([]);
    const [localStorageData] = useLocalStorage();
    const [showOptions, setShowOptions] = useState('');
    const useRoutes = useLocation();
    const navigate = useNavigate();
    const [reloadPostComment, seReLoadPostComment] = useState(false);
    const PostCommentRef = useRef(null);

    useEffect(() => {
        if (useRoutes.pathname.split('/')[1] === 'homepage') {
            getCommentApi();
        } else {
            setCommentData(userCommentData);
        }
    }, [reLoad, userCommentData, postId, reloadPostComment]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (PostCommentRef.current) {
                if (!(event.target.className === PostCommentRef.current.className)) {
                    setShowOptions('')
                }
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

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

    const toggleOptions = (commentId) => {
        setShowOptions(showOptions === commentId ? '' : commentId);
    };

    const getOnePostApi = (POSEID) => {
    /*     axios({
            url: `http://127.0.0.1:4000/findonepost/${POSEID}`,
            headers: { 'Authorization': `Bearer ${localStorageData.jwt}` },
        })
             */
        getOnePost(POSEID).then((response) => {
                const data = JSON.stringify({ ...response.data, from: 'user' });
                navigate(`/homepage/${POSEID}`, { state: data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {commentdata.map((item) => (
                <li key={item._id} className={style.comments}>
                    <span className={style.comment}>
                        <div className={style.name}>
                            <div className={style.handimg}>
                                <img src={item.users[0].headimg} className={style.headimgs} alt="user" />
                            </div>
                            <div onClick={() => setInputData('@' + item.users[0].username + ':')}>{item.users[0].username}</div>
                        </div>
                        <div onClick={() => toggleOptions(item._id)} style={{ position: 'relative', color: 'var(--fontColor)' }} ref={PostCommentRef} className='PostCommentRef' >
                            ...
                            {showOptions === item._id && (
                                <div className={style.postDeleteBox} onClick={e => e.stopPropagation()} >
                                    {localStorageData.userid === item.users[0]._id ? (
                                        <span className={style.postDeleteBoxButton} onClick={() => deleteHandler(item._id)}>
                                            删除
                                        </span>
                                    ) : null}
                                    {useRoutes.pathname.split('/')[1] !== 'homepage' ? (
                                        <span className={style.postDeleteBoxButton} onClick={() => getOnePostApi(item.postId)}>
                                            进入文章
                                        </span>
                                    ) : null}
                                    <span className={style.postDeleteBoxButton} onClick={() => setInputData({ targetName: '@' + item.users[0].username, commentid: item._id })}>
                                        回复{item.users[0].username}
                                    </span>
                                    <span className={style.postDeleteBoxButton}>举报</span>
                                </div>
                            )}
                        </div>
                    </span>
                    <span style={{ marginLeft: '2rem' }} className={style.commentText}>{item.commentText}</span>
                    <div className={style.Replyimport}>
                        <div className={style.Reply}>
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