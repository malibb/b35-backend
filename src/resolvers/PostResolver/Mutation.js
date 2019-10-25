const {
    createPost,
    updatePost,
    deletePost
} = require('../../services/PostService');
const {
    getOneAuthor
} = require('../../services/AuthorService');

const createNewPost = async (_, { data }) => {
    const post = await createPost(data);
    const author = getOneAuthor( data.author );
    author.posts.push(post._id);
    author.save();
    return post;
};

const updateOnePost = async (_, {
    id,
    data
}) => {
    const post = await updatePost(id, data);
    if (!post) throw new Error('Post not exist');
    return post;
};

const deleteOnePost = async (_, {
    id
}) => {
    const post = await deletePost(id);
    if (!post) throw new Error('Post not exist');
    return 'Post deleted';
};

module.exports = {
    createNewPost,
    updateOnePost,
    deleteOnePost
};