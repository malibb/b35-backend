const {
    getAllAuthors,
    getOneAuthor
} = require('../../services/AuthorService');

const getAuthors = async () => {
    const authors = await getAllAuthors();
    return authors;
};

const getSingleAuthor = async (_, { id }) => {
    const author = await getOneAuthor(id);
    if(!author) throw new Error('Author not exist');
    return author;
};

const me = async(root, params, { user }) => {
    const author = await getOneAuthor(user._id);
    return author;
};

module.exports = {
    getAuthors,
    getSingleAuthor,
    me,
};