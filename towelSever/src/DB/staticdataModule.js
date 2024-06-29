const mongoose = require('mongoose')
const STATICDATA = new mongoose.Schema({
    staticType: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectID, required: true },
    staticUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectID, required: true, ref: 'USERS' },
})
module.exports = STATICDATA;