import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  url: String,
  description: String
});
const Site = mongoose.model('Site', schema);

export default Site;
