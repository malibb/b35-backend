const { Authors } = require('../models');

const createAuthor = (data) => Authors.create(data);

const getAllAuthors = () => Authors.find({is_active:true});

module.exports = {
    createAuthor,
    getAllAuthors
};
