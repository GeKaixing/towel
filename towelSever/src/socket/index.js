const { MENTIONS } = require('../DB/index');
const ObjectID = require('mongodb').ObjectId;
const userSocketMap = new Map(); 
module.exports = (io) => {
    io.on('connection', async (socket) => {
        const UserID = socket.handshake.query.userid
        userSocketMap.set(UserID,socket.id)
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
        socket.on('privatachat', (data) => {
            console.log(data)
            const targetSocketId = userSocketMap.get(data.userid);
            socket.to(targetSocketId).emit('sendMsg',data)
        })
           // 处理用户断开连接
        socket.on('disconnect', () => {
            console.log(`User ${UserID} disconnected`);
            userSocketMap.delete(UserID); // 从映射中删除该用户
        });
    })
};