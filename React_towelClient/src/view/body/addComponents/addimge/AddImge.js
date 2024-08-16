import React, { useState } from 'react'
// import { postUpLoad } from '../../../../services/add/add';
import addImgaIcon from '../../../../assets/static/otherIcon/图片添加.svg'
import addImgaPichIcon from '../../../../assets/static/otherIconPitchUp/图片添加.svg'
// import useLocalStorage from '../../../../hooks/useLocaStorage';
import PropTypes from 'prop-types';
export default function AddImge({setImageData,showImageData,setShowImageData}) {
    const [isHoveredImage, setIsHoveredImage] = useState(false);
    // const [localStorageData] = useLocalStorage()
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
            setImageData(file)
        } catch (error) { console.log(error) }

    };

    return (
        <>
            {showImageData &&  <>
                    <img src={showImageData} alt="preview" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                    <div className='w-12 h-12' onClick={() => setShowImageData('')}>删除图片</div>
                </>
            }
            <label htmlFor='inputfile' className='w-12 h-12' title='添加图片'
                onMouseEnter={() => setIsHoveredImage(true)}
                onMouseLeave={() => setIsHoveredImage(false)}
            >
                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={isHoveredImage ? addImgaPichIcon: addImgaIcon} alt='添加图片'></img>
            </label>
            <input type="file" id='inputfile' style={{ display: 'none' }} accept="image/*" onChange={upImageApi} />
        </>
    )
}

AddImge.propTypes = {
    setImageData: PropTypes.func,
    showImageData: PropTypes.string,
    setShowImageData: PropTypes.func,

}