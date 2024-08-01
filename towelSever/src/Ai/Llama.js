const express = require('express')
const router = express()
const axios = require('axios')
router.post('/llama',  (req, res) => {
        const { context } = req.body.data
        axios.post('http://localhost:11434/api/chat', {
                "model": "llama3",
                "messages": [
                    {
                        "role": "user",
                        "content": context
                    }
                ],
                "stream": false
            })
            .then(response => {
                res.status(200).send(response.data.message) 
            })
            .catch(error => {
                res.status(500).send({message:error})
            })
})
module.exports = router;