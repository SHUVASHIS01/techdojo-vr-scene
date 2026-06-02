import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  objects: [{
    id: String,
    type: { type: String }, // type is a reserved keyword in mongoose, so need { type: String }
    position: [Number]
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Scene', sceneSchema);
