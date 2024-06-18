import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './User.module.css'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { searchDatauseContext } from '../../context/searchData';
export default function User() {
    // 解构login的state
    const [localStorageData, setLocalStorage] = useState({})
    const [searchData, setSearechData] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorage(JSON.parse(localStorage.getItem('loginData')))
        }
    }, [localStorage])
    const searchDataApi = () => {
        axios({
            url: 'http://127.0.0.1:4000/fliterpsot',
            method: 'post',
            data: {
                data: {
                    postText: searchData
                }
            }
        })
            .then((response) => {
                navigate(`/search`, { state: response.data });
                setSearechData('')
            })
            .catch((error) => { console.log(error) })
    }
    return (
        <div className={style.user}>{localStorageData.jwt ?
            <div className={style.userbox}>
                <div className={style.handimg}>
                    <img src={localStorageData.headimg} className={style.test}></img>
                </div>
                <Link className={style.usernames} to={`/userhomepage/${localStorageData.userid}`}>{localStorageData.username}</Link>
            </div> : null}
            <form className={style.search} onSubmit={(e) => { e.preventDefault() }}>
                <input className={style.searchimport} type='text' placeholder='search more' value={searchData} onChange={(e) => { e.preventDefault(); setSearechData(e.target.value) }}></input>
                <SearchOutlined type='submit' onClick={searchDataApi} className={style.SearchOutlined} style={{ fontSize: '25px', color: '#f6f6f6 ' }} />
            </form>
            <div className={style.recommend}>
                <div>推荐关注</div>
                <div className={style.recommends}>
                    <div> <div className={style.recommendhand}>
                        <img className={style.test}></img>
                    </div><Link to={`/userhomepage/${localStorageData.userid}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div> <div className={style.recommendhand}></div><Link to={`/userhomepage/${localStorageData.userid}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div> <div className={style.recommendhand}></div><Link to={`/userhomepage/${localStorageData.userid}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div> <div className={style.recommendhand}></div><Link to={`/userhomepage/${localStorageData.userid}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div>更多...</div>
                </div>
            </div>
        </div>

    )
}
