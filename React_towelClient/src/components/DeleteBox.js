import React,{useState} from 'react'
import useLocalStorage from '../hooks/useLocaStorage'
import Portal from './Portal'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

function DeleteBox({ postUserId, userName, headimg, deleteHandler, reportHandler = () => { alert('举报成功') }, children }) {
    const [localStorageData] = useLocalStorage()
    const [showModal, setShowModal] = useState(true);
    return (
        <>
            {showModal && < Portal >
                <div className='flex flex-col w-[200px] justify-center items-center space-y-2 ' onClick={e => e.stopPropagation()} >
                    {localStorageData.userid === postUserId ? <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={deleteHandler}>删除</span> : null}
                    {children}
                    <Link to={`/privatechat/${postUserId}`}    state={{ userName, headimg }} className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' >私信</Link>
                    <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={reportHandler}>举报</span>
                    <span className='w-[150px] h-[50px] bg-[--assistantColor] flex justify-center items-center rounded-my-rounded-10px ' onClick={()=>setShowModal(false)}>关闭</span>
                </div>
            </Portal >
            }
        </>
    )
}
export default DeleteBox
DeleteBox.propTypes = {
    postUserId: PropTypes.string,
    deleteHandler: PropTypes.func,
    reportHandler: PropTypes.func,
    children: PropTypes.node,
    userName:PropTypes.string,
    headimg:PropTypes.string
    // className: PropTypes.string,
}