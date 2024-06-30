import axios from 'axios';
import React, { useState } from 'react';
import style from './AddContent.module.css';


export default function Portal() {
    const loginDataParse = JSON.parse(localStorage.getItem('loginData'));
    const [textareaData, settextareaData] = useState('');
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
            const response = await axios({
                url: `http://127.0.0.1:4000/upload/${loginDataParse.userid}`,
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${loginDataParse.jwt}`,
                }
            });
            setResponseImageData(response.data.staticUrl);

        } catch (error) {
            console.log(error);
        }
    };
    const sendPostApi = async () => {
        try {
            const loginDataParse = JSON.parse(localStorage.getItem('loginData'));
            await axios({
                url: `http://127.0.0.1:4000/addpost`,
                method: 'post',
                data: {
                    data: {
                        UserId: loginDataParse.userid,
                        Text: textareaData,
                        Image: responseImageData,
                        Share: 0,
                        Like: 0,
                        Comment: 0
                    }
                },
                headers: {
                    'Authorization': `Bearer ${loginDataParse.jwt}`,
                }
            });
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
        <div className={style.addContent}>
            <div className={style.messagebigbox}>
                <div className={style.messagebox}>
                    <div className={style.thisshowname}>
                        <div className={style.handimg}>
                            <img src={loginDataParse.headimg} className={style.img} alt="user" />
                        </div>
                        <div className={style.handname}>{loginDataParse.username}</div>
                    </div>
                    <div className={style.thisshowcontent}>
                        <textarea
                            value={textareaData}
                            onChange={(e) => settextareaData(e.target.value)}
                            style={{ resize: "vertical",backgroundColor:'var(--boxColor)',color:'var(--fontColor)' }}
                        />
                    </div>
                    <div className={style.thisshowbottom}>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path}></img>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon2.path}></img>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon3.path}></img>
                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon4.path}></img>
                    </div>
                </div>
            </div>
            <div className={style.addbutton}>
                {showImageData && (
                    <>
                        <img src={showImageData} alt="preview" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                        <div className={style.inputFlie} onClick={() => setShowImageData('')}>删除图片</div>
                    </>
                )}
                <label htmlFor='inputfile' className={style.inputFlie} title='添加图片'
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
                <div className={style.addbuttonAdd} onClick={sendPostApi}
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
