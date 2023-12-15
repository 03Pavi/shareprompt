import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema);

export default Tag;