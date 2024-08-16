const express = require('express')
const router = express()
const axios = require('axios')
router.get('/toutiaohot',  (req, res) => {
        axios.get('https://dabenshi.cn/other/api/hot.php?type=toutiaoHot')
            .then(response => {
            console.log(response)
                res.status(200).send(response.data) 
            })
            .catch(error => {
                res.status(500).send({message:error})
            })
})
module.exports = router;