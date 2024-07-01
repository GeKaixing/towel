const router = require('express').Router();
const ObjectID = require('mongodb').ObjectId;

const {
    POSTS,
    COMMENTS,
    REPLYS,
    USERS,
    LIKES,
    FAVORITES,
    STATICDATAS,
    MENTIONS,
    verificationCodes } = require('../../DB/index');
router.get('/userinfo/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await USERS.findOne( { _id: id }, { password: 0 })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
)
module.exports=router;