import Tournir from "./model"

const tournirControler = {
    //отримати всі
    async get: function (request, response) {
        try {
            const list = await Tournir.find(makeQueryObject(req.query));
            response.send(list);
        }
            catch(error){
            response.status(500).send(error);
        }
    
    },
    
    async getByCount(req,res){
        function makeQueryObject(query){
            let result = {};        
            if (query.data){
                result.data = {"$gte":(query.count)};
            }   
            return result; 
        }
        try {
            const list = await Tournir.findByData.findByData(makeQueryObject(req.params.count));
            response.send(list);
        }
            catch(error){
            response.status(500).send(error);
        }
    },

    async post (req, res) {
    try {
        const tournir = new tournir(req.body);
        await tournir.save();
        res.send(tournir);

        } catch (error) {
        res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const tournir = await Tournir.findByIdAndDelete(req.params.id);
            if (!tournir)
                res.status(404).send("Not found");
            res.send(tournir);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async patch(req, res) {
        try {
            const tournir = await Tournir.findByIdAndUpdate(req.params.id, req.body,  {new: true});
            if (!tournir)
                res.status(404).send("Not found");
            await Tournir.save();
            res.send(tournir);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default tournirControler;