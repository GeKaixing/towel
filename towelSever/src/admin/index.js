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
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const data = await USERS.findByIdAndDelete(
            { _id: userid },
        );
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete('/delpostadmin/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const delPost = await POSTS.findByIdAndDelete({ _id: postId })
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
            { title:title},
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
        const context=req.body.data.context
        const delPost = await POSTS.findOneAndUpdate(
            { _id: postId },
            { context:context},
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为)
        )
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;