import React from 'react'
import style from './DeleteBox.module.css'
 function DeleteBox(props) {
    console.log(props.array)
    return (
        props.array.map((item, index) => (
            <div className={style.postDeleteBox} key={index}>
                <span className={style.postDeleteBoxButton} onClick={item.onclick} >{item.title}</span>
            </div>
        ))
    )
}
export default DeleteBox