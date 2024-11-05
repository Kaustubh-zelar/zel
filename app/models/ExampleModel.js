import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.models.Example || mongoose.model('Example', ExampleSchema);
