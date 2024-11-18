import mongoose, { Schema } from "mongoose";

const workshopSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: Date,
      required: true
    },
    mode: {
      type: String,
      enum: ['online', 'offline'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Workshop = mongoose.models.Workshop || mongoose.model("Workshop", workshopSchema);

export default Workshop;
