import { marked } from 'marked';
import React, { useContext, useEffect } from 'react'
import Post from '../../../components/Post';
import useLocalStorage from "../../../hooks/useLocaStorage"
import style from "./Blog.module.css"
import DOMPurify from 'dompurify';
import { selectLightorDarkContext } from '../../../store/selectLightorDark';
/* global require */
const markdownContext = require.context('../../../assets/markdown', false, /\.md$/);
const markdownFiles = markdownContext.keys().reduce((acc, file) => {
    const fileName = file.replace('./', '').replace('.md', '');
    //  console.log(`Loading file: ${file}`); // 打印文件路径
    acc[fileName] = markdownContext(file); 
    return acc;
}, {});
export default function Blog() {
    const entries = Object.entries(markdownFiles)
    const{colorModel}= useContext(selectLightorDarkContext)
    const [localStorageData]=useLocalStorage()
    useEffect(()=>{
        const loadTheme = async () => {
            if (localStorage.getItem('color-model')==='light'||localStorage.getItem('color-model')==='bing') {
              await import ('github-markdown-css/github-markdown-light.css')
            } else {
              await import('github-markdown-css/github-markdown-dark.css');
            }
          };
          loadTheme()
    },[colorModel])
    return (
        <div className='p-2'>  
             {
            entries.map(([key,value]) => (
            <Post 
            key={key}
            id={localStorageData.userid||"0"}
            name={localStorageData.username||"towel"}
            headimg={localStorageData.headimg||'https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'}
            content={ <div className={`${style.markdownbody} markdown-body`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(value)) }} />}
            comments={0}
            likes={0}
            favorites={0}
            postImages={""}
            postUserId={localStorageData.userid||'0'}
            blog={true}
          >
          </Post>
        ))
        }
         
        </div>

    )
}
