const {
    Posts
} = require('../models');

const createPost = (data) => Posts.create(data);

const getOnePost = (id) => Posts.findById({
    _id: id,
    is_active: true
});
const getAllPosts = () => Posts.find({
    is_active: true
});
const updatePost = (id, data) => Posts.findByIdAndUpdate(id, {
    ...data
}, {
    new: true
});
const deletePost = (id) => Posts.findByIdAndUpdate({
    _id: id,
    is_active: true
}, {
    is_active: false
});

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getOnePost
};
