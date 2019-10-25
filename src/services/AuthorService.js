const { Authors } = require('../models');

const createAuthor = (data) => Authors.create(data);

const getOneAuthor = (id) => Authors.findById({_id: id, is_active:true}).populate('posts');
const getAllAuthors = () => Authors.find({is_active:true}).populate('posts');
const updateAuthor = (id, data) => Authors.findByIdAndUpdate(id,{...data},{ new:true });
const deleteAuthor = (id) => Authors.findByIdAndUpdate({_id:id, is_active: true},{is_active:false});

module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAllAuthors,
    getOneAuthor
};
