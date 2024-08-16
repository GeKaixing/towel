import React, { useEffect, useRef, useState } from 'react';
// import style from './AddContent.module.css';
import useLocalStorage from '../../../hooks/useLocaStorage';
import { postAddPost, postUpLoad } from '../../../services/add/add';
import likeIcon from '../../../assets/static/postIcon/赞.svg'
import commentIcon from '../../../assets/static/postIcon/评论.svg'
import startIcon from '../../../assets/static/postIcon/星星.svg'
import shareIcon from '../../../assets/static/postIcon/分享.svg'
import addImgaIcon from '../../../assets/static/otherIcon/图片添加.svg'
import addImgaPichIcon from '../../../assets/static/otherIconPitchUp/图片添加.svg'
import addIcon from '../../../assets/static/MainMenuIcon/添加.svg'
import addPichIcon from '../../../assets/static/MainMenuIconPitchUp/添加.svg'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Addvideo from './addvideo/Addvideo';
export default function Portal() {
    const [textareaData, settextareaData] = useState('');
    const [localStorageData] = useLocalStorage()
    const loginDataParse = localStorageData
    const [showImageData, setShowImageData] = useState('');
    const [responseImageData, setResponseImageData] = useState('')
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredImage, setIsHoveredImage] = useState(false);
    const [isMarkdown, setIsMarkdown] = useState(false);
    const textareaRef = useRef(null);
    const [videoData,setVideoData]=useState('')

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // 重置高度为 auto，以便在内容减少时能缩小
            textarea.style.height = 'auto';
            // 设置高度为 scrollHeight，以便内容增加时自动扩展
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [textareaData]); // 当 textareaData 改变时执行

    const upImageApi = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (event) {
                setShowImageData(event.target.result);
            };
            reader.readAsDataURL(file);
            await upLoadApi(file);
        } catch (error) { console.log(error) }

    };
    const upLoadApi = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('targetId', loginDataParse.userid);
            formData.append('staticType', 'add');
            const response = await postUpLoad(loginDataParse.userid, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setResponseImageData(response.data.staticUrl);
        } catch (error) {
            console.log(error);
        }
    };
    const sendPostApi = async () => {
        try {
            if (textareaData) {
                const loginDataParse = JSON.parse(localStorage.getItem('loginData'));
                await postAddPost({
                    data: {
                        UserId: loginDataParse.userid,
                        Text: textareaData,
                        Image: responseImageData,
                        Share: 0,
                        Like: 0,
                        Comment: 0
                    }
                })
                settextareaData('')
                setShowImageData('')
            } else {
                alert('不要空哦')
            }

        } catch (error) { console.log(error) }
    }

    class PostIcon {
        constructor(path) {
            {/* global process*/ }
            this.path = process.env.PUBLIC_URL + path
        }
    }
    const postIcon1 = new PostIcon(likeIcon)
    const postIcon2 = new PostIcon(commentIcon)
    const postIcon3 = new PostIcon(startIcon)
    const postIcon4 = new PostIcon(shareIcon)
    const postIcon5 = new PostIcon(addImgaIcon)
    const postIcon55 = new PostIcon(addImgaPichIcon)
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
                {showImageData && (
                    <>
                        <img src={showImageData} alt="preview" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                        <div className='w-12 h-12' onClick={() => setShowImageData('')}>删除图片</div>
                    </>
                )}
                <label htmlFor='inputfile' className='w-12 h-12' title='添加图片'
                    onMouseEnter={() => setIsHoveredImage(true)}
                    onMouseLeave={() => setIsHoveredImage(false)}
                >
                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={isHoveredImage ? postIcon55.path : postIcon5.path} alt='添加图片'></img>
                </label>
                <input type="file" id='inputfile' style={{ display: 'none' }} onChange={upImageApi} />
                <Addvideo setVideoData={setVideoData}></Addvideo>
                <div className='w-12 h-12' onClick={sendPostApi}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={isHovered ? postIcon7.path : postIcon6.path} alt='发布'></img>
                </div>
            </div>
        </div>
    );
}
