import React, { createContext, useContext, useEffect, useState } from 'react';

interface AddPostContextType {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPost = createContext<AddPostContextType | null>(null);

export default function AddPostContext({ children }) {
    const [isShow, setShows] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const setShow = (params:boolean) => {
        if (width > 768) {
             setShows(params)
        } else {
            return null;
        }
    }
    
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
    },[])
    return (
        <AddPost value={{ isShow, setShow }}>
            {children}
        </AddPost>
    );
}

export const useShowAddPost = () => {
    const context = useContext(AddPost);
    if (context === null) {
        throw new Error('useShowAddPost must be used within an AddPostContext');
    }
    return context;
};