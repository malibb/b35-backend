const { createAuthor, updateAuthor, deleteAuthor } = require('../../services/AuthorService');
const authenticate = require('../../utils/authenticate');
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

const login = async (_, params) => {
    const token = await authenticate(params).catch(e => { throw e;});
    return { token: token, message:'Login Sucessful' };
};

module.exports = {
    createNewAuthor,
    updateOneAuthor,
    deleteOneAuthor,
    login
};