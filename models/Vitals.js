import mongoose from 'mongoose';

const VitalsSchema = new mongoose.Schema({
  heartRate: {
    type: Number,
    required: true,
  },
  spO2: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Vitals || mongoose.model('Vitals', VitalsSchema);
