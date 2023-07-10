import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
    unique: true,
  },
  access_token: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;