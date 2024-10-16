import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourtSchema = new Schema({
    number: { type: Number, required: true },
    sport: { type: Schema.Types.ObjectId, ref: 'Sport', required: true }
  });
  
  const Court = mongoose.model('Court', CourtSchema);

  export default Court;
  