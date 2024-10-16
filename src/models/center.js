import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CenterSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  sports: [{ type: Schema.Types.ObjectId, ref: 'Sport' }]
});

const Center = mongoose.model('Center', CenterSchema);

export default Center;
