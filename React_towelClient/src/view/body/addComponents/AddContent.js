import React, { useEffect, useRef, useState } from 'react';
// import style from './AddContent.module.css';
import useLocalStorage from '../../../hooks/useLocaStorage';
import { postAddPost } from '../../../services/add/add';
import likeIcon from '../../../assets/static/postIcon/赞.svg'
import commentIcon from '../../../assets/static/postIcon/评论.svg'
import startIcon from '../../../assets/static/postIcon/星星.svg'
import shareIcon from '../../../assets/static/postIcon/分享.svg'
import addIcon from '../../../assets/static/MainMenuIcon/添加.svg'
import addPichIcon from '../../../assets/static/MainMenuIconPitchUp/添加.svg'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Addvideo from './addvideo/Addvideo';
import AddImge from './addimge/AddImge';
import { postUpLoad } from '../../../services/add/add';
import axios from 'axios';
export default function Portal() {
    const [textareaData, settextareaData] = useState('');
    const [localStorageData] = useLocalStorage()
    const loginDataParse = localStorageData
    // const [responseImageData, setResponseImageData] = useState('')
    // const [responseVideoData, setResponseVideoData] = useState('')
    const [isHovered, setIsHovered] = useState(false);
    const [isMarkdown, setIsMarkdown] = useState(false);
    const textareaRef = useRef(null);
    //存储图片信息
    const [showImageData, setShowImageData] = useState('');
    const [ImageData, setImageData] = useState('')
    //存储视频信息
    const [showVideo, setShowVideo] = useState('');
    const [videoData, setVideoData] = useState('')
    //存储标题信息
    const [postTitle,setPostTitle]=useState('');
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // 重置高度为 auto，以便在内容减少时能缩小
            textarea.style.height = 'auto';
            // 设置高度为 scrollHeight，以便内容增加时自动扩展
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [textareaData]); // 当 textareaData 改变时执行
    const upLoadApi = async () => {
        try {
            const formData = new FormData();
            formData.append('file', ImageData);
            formData.append('targetId', localStorageData.userid);
            formData.append('staticType', 'add');
            const response = await postUpLoad(localStorageData.userid, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            return response.data.staticUrl
        } catch (error) {
            console.log(error);
        }
    };
    const uploadvideo = async () => {
        const formData = new FormData();
        formData.append('video', videoData);
        formData.append('targetId', localStorageData.userid);
        formData.append('staticType', 'add');
        /* global process */
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}uploadvideo/${localStorageData.userid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorageData?.jwt}`
            }
        })
        return response.data.staticUrl;
        // setResponseVideoData(()=>console.log(2));
    }
    const sendPostApi = async () => {
        try {
            let imgurl;
            let videourl;
            // 如果有图片数据，则上传图片
            if (showImageData) {
                imgurl= await upLoadApi(); // 等待图片上传完成
                console.log(imgurl)
            }

            // 如果有视频数据，则上传视频
            if (videoData) {
                videourl= await uploadvideo(); // 等待视频上传完成
            }
            if (textareaData || showImageData || videoData) {
                const loginDataParse = JSON.parse(localStorage.getItem('loginData'));
                await postAddPost({
                    data: {
                        UserId: loginDataParse.userid,
                        Text: textareaData,
                        Image: imgurl,
                        Video: videourl,
                        Share: 0,
                        Like: 0,
                        Comment: 0,
                        Title:postTitle
                    }
                })
                settextareaData('')
                setShowImageData('')
                setShowVideo('')
                setVideoData('')
                setPostTitle('')
            } else {
                alert('不要空哦')
            }

        } catch (error) { console.log(error) }
    }
    class PostIcon {
        constructor(path) {

            this.path = process.env.PUBLIC_URL + path
        }
    }
    const postIcon1 = new PostIcon(likeIcon)
    const postIcon2 = new PostIcon(commentIcon)
    const postIcon3 = new PostIcon(startIcon)
    const postIcon4 = new PostIcon(shareIcon)
    const postIcon6 = new PostIcon(addIcon)
    const postIcon7 = new PostIcon(addPichIcon)

    return (
        <div className='flex flex-col w-full px-2 py-2 '>
            <div className='flex flex-row w-full bg-[--boxColor] px-2 py-2 rounded-my-rounded-10px'>
                {/* the box */}
                <div className='w-full'>
                    {/* headImg userName */}
                    <div className='flex flex-row  items-center space-x-2 '>
                        <img src={loginDataParse.headimg} className='h-10 w-10 rounded-full' alt="user" />
                        <div className='font-bold text=[--fontColor] cursor-pointer'>{loginDataParse.username}</div>
                        <div className='flex items-center space-x-2' onClick={() => setIsMarkdown(!isMarkdown)}><p className={isMarkdown ? 'font-bold' : ''}>markdown</p>{isMarkdown && <div className='w-2 h-2 rounded-full bg-[--hostColor]'></div>}</div>
                    </div>
                    {/* postTitle */}
                    <input className='mb-2 mt-2 w-full bg-[--boxHoverColor] border-2 border-[--boxHoverColor] hover:border-[--assistColor] my-rounded-10px' placeholder='标题,最多30字哦' onChange={(e)=>{setPostTitle(e.target.value)}} value={postTitle} maxLength={30}></input>
                    {/* textContent */}
                    <textarea
                        ref={textareaRef}
                        value={textareaData}
                        onChange={(e) => settextareaData(e.target.value)}
                        className='w-full h-auto bg-[--boxHoverColor] border-2 border-[--boxHoverColor] hover:border-[--assistColor]'
                        placeholder="请输入您要发布的内容"
                        rows={1}
                        maxLength={10000}
                        style={{ resize: "vertical", backgroundColor: 'var(--boxColor)', color: 'var(--fontColor)' }}
                    ></textarea>
                    {textareaData.length >= 1000 && <p className="text-red-500">最多10000字哦</p>}
                    {isMarkdown && <div className='prose lg:prose-xl' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(textareaData)) }}></div>}
                    {/* boxBottom */}
                    <div className='flex justify-around h-5 w-full'>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path}></img>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon2.path}></img>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon3.path}></img>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon4.path}></img>
                    </div>
                </div>
            </div>
            {/* 功能 */}
            <div className='flex flex-col justify-center items-center mt-2'>
                <AddImge setImageData={setImageData} showImageData={showImageData} setShowImageData={setShowImageData}></AddImge>
                <Addvideo setVideoData={setVideoData} showVideo={showVideo} setShowVideo={setShowVideo}></Addvideo>
                <div className='w-12 h-12' onClick={sendPostApi}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={isHovered ? postIcon7.path : postIcon6.path} alt='发布'></img>
                </div>
            </div>
        </div>
    );
}
