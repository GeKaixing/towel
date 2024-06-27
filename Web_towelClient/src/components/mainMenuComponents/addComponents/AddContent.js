import axios from 'axios';
import React, { useState } from 'react';
import { LikeFilled, StarFilled, RocketFilled, MessageFilled } from '@ant-design/icons';
import style from './AddContent.module.css';


export default function Portal() {
    const loginDataParse = JSON.parse(localStorage.getItem('loginData'));
    const [textareaData, settextareaData] = useState('');
    const [showImageData, setShowImageData] = useState('');
    const [responseImageData, setResponseImageData] = useState('')
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
    return (
        <div className={style.addContent}>
            <div className={style.messagebigbox}>
                <div className={style.messagebox}>
                    <div className={style.thisshowname}>
                        <div className={style.handimg}>
                            <img src={loginDataParse.headimg} className={style.img} alt="user" />
                        </div>
                        <div className={style.handname}>{'name'}</div>
                    </div>
                    <div className={style.thisshowcontent}>
                        <textarea
                            value={textareaData}
                            onChange={(e) => settextareaData(e.target.value)}
                            style={{ resize: "vertical" }}
                        />
                    </div>
                    <div className={style.thisshowbottom}>
                        <div id='like' className={style.whitelike}><LikeFilled />{'likes'}</div>
                        <div className={style.MessageFilled}><MessageFilled />{'comments'}</div>
                        <div className={style.star}><StarFilled />收藏{'favorites'}</div>
                        <div className={style.share}><RocketFilled />分享</div>
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
                <label htmlFor='inputfile' className={style.inputFlie} title='添加图片'>上传图片</label>
                <input type="file" id='inputfile' style={{ display: 'none' }} onChange={upImageApi} />
                <div className={style.addbuttonAdd} onClick={sendPostApi}>添加</div>
            </div>
        </div>
    );
}
