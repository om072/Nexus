import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SportSchema = new Schema({
    name: { type: String, required: true },
    center: { type: Schema.Types.ObjectId, ref: 'Center', required: true },
    courts: [{ type: Schema.Types.ObjectId, ref: 'Court' }]
  });
  
const Sport = mongoose.model('Sport', SportSchema);

export default Sport;