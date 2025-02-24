import React, { useEffect, useRef, useState } from 'react';
import useLocalStorage from '../../../hooks/useLocaStorage';
import { postAddPost } from '../../../services/add/add';
import likeIcon from '../../../assets/static/postIcon/赞.svg'
import commentIcon from '../../../assets/static/postIcon/评论.svg'
import startIcon from '../../../assets/static/postIcon/星星.svg'
import shareIcon from '../../../assets/static/postIcon/分享.svg'
import addIcon from '../../../assets/static/MainMenuIcon/add.svg'
import addPichIcon from '../../../assets/static/MainMenuIconPitchUp/add.svg'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Addvideo from './addvideo/Addvideo';
import AddImge from './addimge/AddImge';
import { postUpLoad } from '../../../services/add/add';
import axios from 'axios';
import dayjs from 'dayjs'
import ReactQuill from 'react-quill';//不支持react 19
import 'react-quill/dist/quill.snow.css';
import { useLanguage } from '../../../store/LanguageContext';
import { createPortal } from 'react-dom';
import PortalComponent from '../../../components/Portal';
import { useShowAddPost } from '../../../store/AddPostContext';

export default function AddContent() {
    const { t } = useLanguage()
    const [textareaData, settextareaData] = useState('');
    const [localStorageData] = useLocalStorage()
    const loginDataParse = localStorageData
    // const [responseImageData, setResponseImageData] = useState('')
    // const [responseVideoData, setResponseVideoData] = useState('')
    const [isHovered, setIsHovered] = useState(false);
    const [isMarkdown, setIsMarkdown] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    //存储图片信息
    const [showImageData, setShowImageData] = useState('');
    const [ImageData, setImageData] = useState('')
    //存储视频信息
    const [showVideo, setShowVideo] = useState('');
    const [videoData, setVideoData] = useState('')
    //存储标题信息
    const [postTitle, setPostTitle] = useState('');
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
            const response = await postUpLoad(localStorageData.userid, formData)
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
        // @ts-ignore
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}uploadvideo/${localStorageData.userid}`, formData, {
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
                imgurl = await upLoadApi(); // 等待图片上传完成
                console.log(imgurl)
            }

            // 如果有视频数据，则上传视频
            if (videoData) {
                videourl = await uploadvideo(); // 等待视频上传完成
            }
            console.log(textareaData)
            if (textareaData ) {
                const loginDataParse = JSON.parse(localStorage.getItem('loginData') || '');
                await postAddPost({
                    data: {
                        UserId: loginDataParse.userid,
                        Text: textareaData,
                        Image: imgurl,
                        Video: videourl,
                        Share: 0,
                        Like: 0,
                        Comment: 0,
                        Title: postTitle,
                        createDate: dayjs().format(),
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
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }], // 标题选项
            ['bold', 'italic', 'underline', 'strike'], // 加粗、斜体等
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            ['link', 'image', 'video'], // 链接和图片
            [{ color: [] }, { background: [] }], // 颜色
            ['clean'], // 清除格式
        ],
    };

    const [wordCount, setWordCount] = useState(0);
    const handleChange = (e:any) => {
        console.log(e.target.value)
        settextareaData(e.target.value);
        // 统计字数（仅统计纯文本部分）
        const plainText = e.target.value.replace(/<\/?[^>]*>/g, '').trim(); // 去除 HTML 标签
        setWordCount(plainText.length);
    };

    const { isShow, setShow } = useShowAddPost();

    return (
        // <div className='flex flex-col w-full px-2 py-2 '>
        //     <div className='flex flex-row w-full bg-[--boxColor] px-2 py-2 rounded-my-rounded-10px'>
        //         {/* the box */}
        //         <div className='w-full'>
        //             {/* headImg userName */}
        //             <div className=' flex flex-row  items-center justify-between '>
        //                 <div className='flex flex-row  items-center space-x-2'>
        //                     <img src={loginDataParse.headimg} className='h-10 w-10 rounded-full' alt="user" />
        //                     <div className='font-bold text-[--fontColor] cursor-pointer'>{loginDataParse.username}</div>
        //                     <div className='flex items-center space-x-2 ' onClick={() => setIsMarkdown(!isMarkdown)}>
        //                         <p className={isMarkdown ? 'font-bold' : ''}>markdown</p>{isMarkdown && <div className='w-2 h-2 rounded-full bg-[--hostColor] '></div>}
        //                     </div>
        //                 </div>
        //                 {/* 功能 */}
        //                 <div className='flex flex-row justify-center items-center '>
        //                     {/*  <AddImge setImageData={setImageData} showImageData={showImageData} setShowImageData={setShowImageData}></AddImge> */}
        //                     <Addvideo setVideoData={setVideoData} showVideo={showVideo} setShowVideo={setShowVideo}></Addvideo>
        //                     <div className='w-12 h-12' onClick={sendPostApi}
        //                         onMouseEnter={() => setIsHovered(true)}
        //                         onMouseLeave={() => setIsHovered(false)}>
        //                         <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={isHovered ? addPichIcon : addIcon} alt='发布'></img>
        //                     </div>
        //                 </div>
        //             </div>
        //             {/* postTitle */}
        //             <input className='mb-2 mt-2 w-full bg-[--boxHoverColor] border-2 border-[--boxHoverColor] hover:border-[--assistColor] my-rounded-10px' placeholder={t('addposettitle')} onChange={(e) => { setPostTitle(e.target.value) }} value={postTitle} maxLength={30}></input>
        //             {/* textContent */}
        //             {/*    <div id='editor'></div> */}
        //             {/*           <textarea
        //                 ref={textareaRef}
        //                 value={textareaData}
        //                 onChange={(e) => settextareaData(e.target.value)}
        //                 className='w-full h-auto bg-[--boxHoverColor] border-2 border-[--boxHoverColor] hover:border-[--assistColor]'
        //                 placeholder="请输入您要发布的内容"
        //                 rows={1}
        //                 maxLength={10000}
        //                 style={{ resize: "vertical", backgroundColor: 'var(--boxColor)', color: 'var(--fontColor)' }}
        //             ></textarea> */}

        //             {/* <ReactQuill modules={modules} value={textareaData} onChange={handleChange} /> */}

        //             {wordCount >= 1000 && <p className="text-red-500">{t('wordsMax')}</p>}
        //             {isMarkdown && <div className='prose lg:prose-xl' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(textareaData) as string) }}></div>}
        //             {/* boxBottom */}
        //             <div className='flex justify-around h-5 w-full'>
        //                 <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={likeIcon}></img>
        //                 <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={commentIcon}></img>
        //                 <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={startIcon}></img>
        //                 <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={shareIcon}></img>
        //             </div>
        //         </div>
        //     </div>
        <>
            {isShow &&
                <PortalComponent>
                    <div className='relative flex flex-col justify-between h-80 bg-white w-[600px] p-2 rounded-[10px]'>
                        {/* header */}
                        <header className='flex justify-between'>
                            <div className='text-[--hostColor] font-bold cursor-pointer' onClick={() => { setShow(false) }}>cancel</div>
                            <div className='font-bold w-14 bg-[--hostColor] cursor-pointer rounded-[10px] flex justify-center items-center text-[--fontColor] h-8' onClick={sendPostApi}>post</div>
                        </header>
                        {/* body */}
                        <main className='h-full gap-2 '>
                            <div className='flex'>
                                <img src={localStorageData.headimg} className='w-12 h-12  rounded-full bg-white' alt="头像"></img>
                                <div className=' h-full overflow-auto w-full'>
                                    <textarea className='w-full mt-2 h-full ' placeholder='输入内容' onChange={handleChange} value={textareaData}></textarea>

                                    {showImageData && <div className=''>
                                        <img src={showImageData} alt="preview" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                                        <DleComponent fn={() => setShowImageData('')}></DleComponent>
                                        {/* <div onClick={() => setShowImageData('')} className='cursor-pointer bg-[--hostColor] rounded-full w-4 h-4 flex justify-center items-center font-bold text-sm self-end'  >X</div> */}
                                    </div>
                                    }

                                    {showVideo && (
                                        <div className='w-full h-auto flex flex-col items-center'>
                                            <video className='w-full h-auto' controls>
                                                <source src={showVideo} type="video/mp4" />
                                            </video>
                                            <DleComponent fn={() => setShowVideo('')}></DleComponent>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </main>

                        {/* footer */}
                        <footer className='absolute bottom-0 bg-white'>
                            <hr></hr>
                            <div className='flex gap-2'>
                                <div className='w-6 h-6 '>
                                    <Addvideo setVideoData={setVideoData} showVideo={showVideo} setShowVideo={setShowVideo}></Addvideo>
                                </div>
                                <div className='w-6 h-6 '>
                                    <AddImge setImageData={setImageData} showImageData={showImageData} setShowImageData={setShowImageData}></AddImge>
                                </div>
                            </div>
                        </footer>
                    </div>
                </PortalComponent>
            }
        </>
        // </div >
    );
}

const DleComponent: React.FC<{ fn: () => void }> = ({ fn }) => (
    <div onClick={fn} className='cursor-pointer bg-[--hostColor] rounded-full w-4 h-4 flex justify-center items-center font-bold text-sm self-end'>X</div>
);