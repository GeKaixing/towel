import React, { useState } from 'react';
// import style from './AddContent.module.css';
import useLocalStorage from '../../../hooks/useLocaStorage';
import { postAddPost, postUpLoad } from '../../../services/add/add';


export default function Portal() {
    const [textareaData, settextareaData] = useState('');
    const [localStorageData] = useLocalStorage()
    const loginDataParse = localStorageData
    const [showImageData, setShowImageData] = useState('');
    const [responseImageData, setResponseImageData] = useState('')
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredImage, setIsHoveredImage] = useState(false);
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
    const postIcon1 = new PostIcon('/static/postIcon/赞.svg')
    const postIcon2 = new PostIcon('/static/postIcon/评论.svg')
    const postIcon3 = new PostIcon('/static/postIcon/星星.svg')
    const postIcon4 = new PostIcon('/static/postIcon/分享.svg')
    const postIcon5 = new PostIcon('/static/otherIcon/图片添加.svg')
    const postIcon55 = new PostIcon('/static/otherIconPitchUp/图片添加.svg')
    const postIcon6 = new PostIcon('/static/MainMenuIcon/添加.svg')
    const postIcon7 = new PostIcon('/static/MainMenuIconPitchUp/添加.svg')

    return (
        <div className='flex flex-col w-full px-2 py-2 '>
            <div className='flex flex-row w-full bg-[--boxColor] px-2 py-2 rounded-my-rounded-10px'>
                {/* the box */}
                <div className='w-full'>
                    {/* headImg userName */}
                    <div className='flex flex-row  items-center space-x-2 '>
                        <img src={loginDataParse.headimg} className='h-10 w-10 rounded-full' alt="user" />
                        <div className='font-bold text=[--fontColor]'>{loginDataParse.username}</div>
                    </div>
                    {/* textContent */}
                  
                        <textarea
                            value={textareaData}
                            onChange={(e) => settextareaData(e.target.value)}
                            className='w-full bg-[--boxHoverColor] border-2 border-[--boxHoverColor] hover:border-[--assistColor]'
                            sp="false"
                            placeholder="请输入内容"
                            rows={1}
                            maxLength={1000}
                            style={{ resize: "vertical", backgroundColor: 'var(--boxColor)', color: 'var(--fontColor)' }}
                        ></textarea>
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
                    {isHoveredImage ?
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon55.path} alt='添加图片'></img>
                        :
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon5.path} alt='添加图片'></img>
                    }
                </label>
                <input type="file" id='inputfile' style={{ display: 'none' }} onChange={upImageApi} />
                <div className='w-12 h-12' onClick={sendPostApi}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {
                        isHovered ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon7.path} alt='发布'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon6.path} alt='发布'></img>
                    }
                </div>
            </div>
        </div>
    );
}
