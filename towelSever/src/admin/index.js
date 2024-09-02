const express = require('express')
const router = express()
const ObjectID = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const {
    POSTS,
    COMMENTS,
    REPLYS,
    USERS,
    LIKES,
    FAVORITES,
    STATICDATAS,
    MENTIONS,
    verificationCodes } = require('../DB/index');
router.get('/alluser', async (req, res) => {
    try {
        const data = await USERS.find()
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
router.post('/banuser/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const data = await USERS.findOneAndUpdate(
            { _id: userid },
            { ban: true },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/offbanuser/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const data = await USERS.findOneAndUpdate(
            { _id: userid },
            { ban: false },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/sealinguser/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const data = await USERS.findOneAndUpdate(
            { _id: userid },
            { sealing: true },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/offsealinguser/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const data = await USERS.findOneAndUpdate(
            { _id: userid },
            { sealing: false },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const data = await USERS.findByIdAndDelete(
            { _id: userid },
            { delete: true },
            { new: true, useFindAndModify: false } 
        );
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/allpostadmin', async (req, res) => {
    try {
        const data = await POSTS.find({
            postDetele:false
        })
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.delete('/delpostadmin/:id', async (req, res) => {
    try {
        const postId = req.params.id
        console.log(postId)
        const delPost = await POSTS.findOneAndUpdate(
            { _id: postId },
            { postDetele:true},
            { new: true, useFindAndModify: false } 
        )
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/updatatitlepostadmin/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const title=req.body.data.title
        const delPost = await POSTS.findOneAndUpdate(
            { _id: postId },
            { postTitle:title},
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为)
        )
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/updatacontextpostadmin/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const text=req.body.data.text
        const delPost = await POSTS.findOneAndUpdate(
            { _id: postId },
            { postText:text},
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为)
        )   
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;