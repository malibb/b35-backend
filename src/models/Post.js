const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
    },
    cover: {
        type: String
    },
    likes:{
        type:Number
    },
    liked_by:{
        type: [Schema.Types.ObjectId],
        ref: 'author',
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('posts', PostSchema);