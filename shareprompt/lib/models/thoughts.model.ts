import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema({
    text: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    tags: { type: [String] }

}, { versionKey: false });

const Thought = mongoose.models.Thought || mongoose.model('Thought', thoughtSchema);

export default Thought;