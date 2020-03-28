//objeto utilizado para alterar o db, como se fosse o context do EF
const connection = require('../database/connection');

module.exports = {
    //Lista Incidentes desta ONG
    async index(request, response) {
        
        const ong_id = request.headers.authorization;

        const incidentes = await connection('incidents')
            .where('ong_id',ong_id)
            .select('*');

        return response.json(incidentes);
    }
}