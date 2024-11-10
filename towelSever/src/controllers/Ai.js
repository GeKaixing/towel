import axios from 'axios'

// Ai接口
export const llanaApi=(req, res) => {
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
}