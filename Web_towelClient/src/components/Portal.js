import { createPortal } from 'react-dom';
export default function Portal({ children }) {
    return (
        createPortal(
            <div className=' fixed top-0 left-0 right-0 bottom-0 bg-[--hostTransparencyColor] flex justify-center items-center' >
                {children}
            </div>
            ,
            document.body
        )
    )
}
