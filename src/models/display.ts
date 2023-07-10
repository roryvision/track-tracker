import mongoose from "mongoose";

const displaySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  orientation: String,
  color_bg: String,
  color_text: String,
  progress: Boolean,
  rounded: Boolean,
});

const Display = mongoose.models.Display || mongoose.model('Display', displaySchema);
export default Display;