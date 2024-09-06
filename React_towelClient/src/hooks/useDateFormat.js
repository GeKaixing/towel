/**
* @param {string} 时间
* @returns {string} 返回格式化的时间
* example:
* const date = useDateFormat('2024-09-06T15:31:26+08:00')
* console.log(date) //15:31
*/
import dayjs from "dayjs";
import { useState,useEffect } from "react";
export default function useDateFormat(dates) {
    const [date,setDate]=useState('')
    useEffect(()=>{
        setDate(dayjs(dates).format('MM-DD HH:mm'))
    })
    return date;
    
}
