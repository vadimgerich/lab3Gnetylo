import mongoose from 'mongoose';

const tournirSchema = new mongoose.Schema({
    pib: {
        type:String,
        required: true
    },
    pol:"",
    age:0,
    country:"",
    points:0
});

const Tournir = mongoose.model("Tournir", tournirSchema);

export default Tournir;