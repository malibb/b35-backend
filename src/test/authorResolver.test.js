const { graphql } = require('graphql');
const { schema } = require('../../index');

const { createAuthor } = require('../services/AuthorService');

const setupTest = require('./helpers');

const MUTATION_ADD_AUTHOR = `
    mutation addAuthor($data:AuthorInput!){
        createNewAuthor(data:$data){
            _id
            email
        }
    }
`;


describe('Test Create Author Mutation', () => {

    beforeEach( async () => await setupTest());

    it('Should Create Author', ()=>{
        const makeTest = async() =>{
            const data = {
                first_name: 'prueba',
                last_name: 'prueba',
                email: 'prueba@prueba.com',
                password: 'prueba'
            };

            graphql(schema, MUTATION_ADD_AUTHOR, null, {}, {data})
                .then( res => {
                    expect(res.data.createNewAuthor).toHaveProperty('email', data.email);
                    expect(res.data.createNewAuthor).toHaveProperty('_id');
                });
        };

        makeTest();
    });

    it('Should not Create an Author', () => {
        const makeTest = async () => {
            const data = {
                first_name: 'prueba',
                last_name: 'prueba',
                email: 'prueba@prueba.com',
                password: 'prueba'
            };
            
            await createAuthor(data);//primero creamos el usuario con email 
            // email: 'prueba@prueba.com'

            graphql(schema, MUTATION_ADD_AUTHOR, null, {}, {data})//Cuando ejecutamos ya existe un usuario 
                .then(res => {// con el mismo email, por lo tanto devuelve errores.
                    expect(res).toHaveProperty('errors');
                });
        };

        makeTest();
    });
});

