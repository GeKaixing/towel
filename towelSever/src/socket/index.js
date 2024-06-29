const { MENTIONS} = require('../DB/index');
const ObjectID = require('mongodb').ObjectId;
module.exports = (io) => {
    io.on('connection', async (socket) => {
        const sendUserID = socket.handshake.query.userid
        socket.on(`newMessage`, async (data) => {
            const datas = await MENTIONS.aggregate([
                {
                    $match: {
                        targetType: 'reply',
                        bymentionUserId: new ObjectID(`${data.userid}`),
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'bymentionUserId',
                        foreignField: '_id',
                        as: 'bymentionUser'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'mentionedUserId',
                        foreignField: '_id',
                        as: 'mentionedUserId'
                    }
                },
                {
                    $project: {
                        'bymentionUser.password': 0,
                        'mentionedUserId.password': 0,
                    }
                }
            ]);
            io.emit(`${data.userid}`, { datas });
        })
    })
};