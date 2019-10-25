const { createAuthor, updateAuthor, deleteAuthor } = require('../../services/AuthorService');

const createNewAuthor = async (_, { data }) => {
    const author = await createAuthor(data);
    return author;
};

const updateOneAuthor = async (_, {id, data}) => {
    const author = await updateAuthor(id, data);
    if (!author) throw new Error('Author not exist');
    return author;
};

const deleteOneAuthor = async (_,{ id }) => {
    const author = await deleteAuthor(id);
    if (!author) throw new Error('Author not exist');
    return 'Author deleted';
};

module.exports = {
    createNewAuthor,
    updateOneAuthor,
    deleteOneAuthor
};