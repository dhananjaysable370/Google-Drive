import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    path: { type: String, required: true },
    originalName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const File = mongoose.model('File', fileSchema);
export default File;