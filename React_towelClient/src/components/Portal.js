import { createPortal } from 'react-dom';
import React from 'react';

export default function Portal({ children,className }) {
    return (
        createPortal(
            <div className={`${className} fixed top-0 left-0 right-0 bottom-0 bg-[--hostTransparencyColor] flex justify-center items-center`} >
                {children}
            </div>
            ,
            document.body
        )
    )
}
