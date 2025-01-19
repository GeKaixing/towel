import React, { createContext, useContext, useState } from 'react';

interface AddPostContextType {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPost = createContext<AddPostContextType | null>(null);

export default function AddPostContext({ children }) {
    const [isShow, setShow] = useState(false);

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