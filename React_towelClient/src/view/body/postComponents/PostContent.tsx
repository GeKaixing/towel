import React, { useEffect, useRef, useState } from 'react'
import Post from '../../../components/Post'
import propTypes from 'prop-types'
import { getPost } from '../../../services/post/post'
import postJson from '../../../assets/json/post.json'
import {Article} from '../../../types/body/postComponents/PostContent'
export default function PostPage() {
  const [articles, setarticles] = useState<Article[]>([]) // 存储加载的数据
  const [reload, setLoad] = useState(false)
  const [page, setPage] = useState(1);   // 当前页码
  const [loading, setLoading] = useState(false);  // 加载状态
  const [hasMore, setHasMore] = useState(true);   // 是否还有更多数据
  const loaderRef = useRef(null); 
  const getPostApi = async (page) => {
    setLoading(true);
    const response = await getPost(`post?page=${page}&limit=5`); // 根据页码获取数据
    const newData = await response.data
      //判断是否有更多数据
     if (newData.length === 0) {
       setHasMore(false);
     } else {
      setarticles((prevData) => [...prevData, ...newData]); // 追加新数据
     }
     setLoading(false);
  };

   // 使用 IntersectionObserver 监听加载器
   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // 加载下一页
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 1.0, // 当目标完全进入视口时触发
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    /*global process */
    process.env.REACT_APP_TEST === 'TEST' ?
      setarticles(postJson) :
      getPostApi(page);
  }, [page])

  useEffect(() => {
    getPost().then((res)=>{
      setarticles(res.data);
    })
  }, [reload]);
  return (
    <>
      {
        <div className='p-2'>
          {articles.map(function (item,index) {
            return (
              <Post
                key={`${item._id}-${index}`}
                id={item._id}
                name={item.user.username}
                headimg={item.user.headimg}
                content={item.postText}
                comments={item.postComment}
                likes={item.postLike}
                favorites={item.postFavorite}
                postImages={item.postImages}
                postVideos={item.postVideos}
                postUserId={item.postUserId}
                postTitle={item.postTitle}
                postCreateDate={item.postCreateDate}
                reload={{ reload, setLoad }}
              >
              </Post>
            );
          })

          }
        </div >
        }
      {loading && <p>加载中...</p>}
      {/* {!hasMore && <p>没有更多数据了</p>} */}
      <div ref={loaderRef}></div>  {/* 用于触发加载下一页 */}
    </>
  )
}
PostPage.propTypes = {
  userarticles: propTypes.array,
}