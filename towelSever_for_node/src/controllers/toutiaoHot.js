import axios from 'axios'

//爬虫爬取今日头条
export const toutiaohotApi=(req, res) => {
    axios.get('https://dabenshi.cn/other/api/hot.php?type=toutiaoHot')
        .then(response => {
            res.status(200).send(response.data) 
        })
        .catch(error => {
            res.status(500).send({message:error})
        })
}