//objeto utilizado para alterar o db, como se fosse o context do EF
const connection = require('../database/connection');

const crypto = require('crypto'); 

module.exports = {
    //Cadastra uma ONG
    async create (request,response) {
        const {nome, email, whatsapp, cidade, uf} = request.body;
    
        console.log(request.body);
    
        //Cria uma palavra aleatória de 4 hex para ser a id
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert(
            {
                id: id,
                nome: nome,
                email: email,
                whatsapp: whatsapp,
                cidade: cidade,
                uf: uf
            }
        );
    
        return response.json({id});
    },

    //Lista todas as ONGs salvas
    async listAll  (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    }
}