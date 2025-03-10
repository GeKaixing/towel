import { createPortal } from 'react-dom';
import React from 'react';

export default function Portal({ children,className='' }) {
    return (
        createPortal(
            <div style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}} className={`${className} fixed z-50 top-0 left-0 right-0 bottom-0  flex justify-center items-center`} >
                {children}
            </div>
            ,
            document.body
        )
    )
}
