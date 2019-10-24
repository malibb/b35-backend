const { createAuthor } = require('../../services/AuthorService');

const createNewAuthor = async (_, params) => {
    const author = await createAuthor(params.data);
    return author;
};

module.exports = {
    createNewAuthor
};