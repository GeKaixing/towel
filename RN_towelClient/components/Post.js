import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import PostHeader from './postComponents/PostHeader'
import PostContext from './postComponents/PostContext'

import axiosInstance from '../axios/axios'
export default function Post() {
  const [inputTextData, setInputTextData] = useState('')
  const [responseFilterData, setResponseFilterData] = useState([])
  useEffect(() => {
    if (inputTextData === '') {
      setResponseFilterData(null)
    }
  }, [inputTextData])
  const searchInputText = async () => {
    try {
      const responseDatas = await axiosInstance({
        url: 'fliterpsot',
        method: 'post',
        data: {
          data: {
            postText: inputTextData
          }
        }
      })
      setResponseFilterData(responseDatas.data)
    } catch (error) { setResponseFilterData([]) }
  }
  return (
    <>
      <PostHeader inputTextData={inputTextData} setInputTextData={setInputTextData} searchInputText={searchInputText}></PostHeader>
      <PostContext responseFilterData={responseFilterData}></PostContext>
    </>
  )
} 