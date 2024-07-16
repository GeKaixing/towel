import React,{useState} from 'react'
import useLocalStorage from '../hooks/useLocaStorage'
import Portal from './Portal'

function DeleteBox({ postUserId, deleteHandler, reportHandler = () => { alert('举报成功') }, children }) {
    const [localStorageData] = useLocalStorage()
    const [showModal, setShowModal] = useState(true);
    return (
        <>
            {showModal && < Portal >
                <div className='flex flex-col w-[200px] justify-center items-center space-y-2 ' onClick={e => e.stopPropagation()} >
                    {localStorageData.userid === postUserId ? <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={deleteHandler}>删除</span> : null}
                    {children}
                    <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={reportHandler}>举报</span>
                    <span className='w-[150px] h-[50px] bg-[--assistantColor] flex justify-center items-center rounded-my-rounded-10px ' onClick={()=>setShowModal(false)}>关闭</span>
                </div>
            </Portal >
            }
        </>
    )
}
export default DeleteBox
