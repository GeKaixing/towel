import React, { useState } from 'react';
import AddvideoIcon from '../../../../assets/static/otherIcon/添加视频.svg';
import AddvideoIconPtch from '../../../../assets/static/otherIconPitchUp/添加视频.svg';
import PropTypes from 'prop-types';


export default function Addvideo({setVideoData,showVideo, setShowVideo}) {
 
    const [isHoveredVideo, setIsHoveredVideo] = useState(false);
    // const [localStorageData] = useLocalStorage()
    const upVideoApi = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const videoURL = URL.createObjectURL(file);
            setShowVideo(videoURL);
            setVideoData(file);
        }
    };

    const handleDeleteVideo = () => {
        setShowVideo('');
    };

    return (
        <>
            
            <label
                htmlFor='inputfilevedio'
                className='w-12 h-12'
                title='添加视频'
                onMouseEnter={() => setIsHoveredVideo(true)}
                onMouseLeave={() => setIsHoveredVideo(false)}
            >
                <img
                    style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }}
                    src={isHoveredVideo ? AddvideoIconPtch : AddvideoIcon}
                    alt='添加视频'
                />
            </label>
            <input
                type="file"
                id='inputfilevedio'
                style={{ display: 'none' }}
                onChange={upVideoApi}
                accept="video/*"
                name='video'
            />
        </>
    );
}
Addvideo.propTypes = {
    setVideoData: PropTypes.func,
    showVideo:PropTypes.string,
    setShowVideo: PropTypes.func,}