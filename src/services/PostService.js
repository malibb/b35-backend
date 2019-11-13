const {
    Posts
} = require('../models');

const createPost = async (data) => {
    const post = await Posts.create(data);
    const populatePost = await getOnePost(post._id);
    return populatePost;
};

const getOnePost = (id) => Posts.findOne({
    _id: id,
    is_active: true
}).populate('author');

const getAllPosts = () => Posts.find({
    is_active: true
}).populate('author');
const updatePost = (id, data, author) => Posts.findOneAndUpdate({_id:id,author}, {
    ...data
}, {
    new: true
}).populate('author');

const deletePost = (id, author) => Posts.findByIdAndUpdate({
    _id: id,
    is_active: true,
    author
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
