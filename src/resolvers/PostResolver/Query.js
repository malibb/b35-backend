const {
    getAllPosts,
    getOnePost
} = require('../../services/PostService');

const getPosts = async () => {
    const posts = await getAllPosts().populate('author');
    return posts;
};

const getSinglePost = async (_, params) => {
    const post = await getOnePost(params.id);
    if (!post) throw new Error('Post not exist');
    return post;
};

module.exports = {
    getPosts,
    getSinglePost
};