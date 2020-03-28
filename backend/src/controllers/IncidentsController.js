//objeto utilizado para alterar o db, como se fosse o context do EF
const connection = require('../database/connection');



module.exports = {
    //Cadastra uma ONG
    async create (request,response) {
        const {titulo, descricao, valor} = request.body;
        const ong_id = request.headers.authorization;

        const id_nova_insercao = await connection('incidents').insert({
            titulo: titulo,
            descricao: descricao,
            valor: valor,
            ong_id: ong_id
        });

        return response.json({id: id_nova_insercao[0]});

    },

    //Lista todos os incidentes salvos
    async listAll  (request, response) {
        //page = 1 dá um valor default para a variável.
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1) * 5)
        .select([
            'incidents.*',
            'ongs.nome',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.cidade',
            'ongs.uf'
        ]);
    
        response.header('X-Total-Count',count['count(*)']);

        return response.json(incidents);
    },

    //Parâmetro numérico de rota é o id do incidente, parâmetro authorization no header é a id da ong dona do incidente.
    async delete (request, response){
        console.log(request.params);

        const {id} = request.params;
        const ong_id = request.headers.authorization;

        //Método first() faz retornar apenas um valor, ao invés de uma array
        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: "Operação não permitida."});
        }

        await connection('incidents').where('id',id).delete(); 

        //Código 204 significa sucesso e response sem conteúdo
        return response.status(204).send();
    }
}