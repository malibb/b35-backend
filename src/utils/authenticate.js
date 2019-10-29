const bcrypt = require('bcrypt');
const { getAuthorByEmail } = require('../services/AuthorService');
const createToken = require('./createToken');

const authenticate = ({email, password}) => {
    return new Promise((resolve,reject) => {
        getAuthorByEmail(email).then( user => {
            if(!user) reject(new Error('Author not Exist'));
            bcrypt.compare(password, user.password, (err,isValid)=> {
                if(err) reject(new Error('Error to compare'));
                isValid ? resolve(createToken(user)) 
                    : reject(new Error('Incorrect Password'));
            });
        });
    });
};

module.exports = authenticate;