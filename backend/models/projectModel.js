import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true,
        minLength: [1, 'Project name must be at least 1 character long'],
        maxLength: [75, 'Project name must be at most 75 characters long'],
        unique: [true, 'Project name must be unique']
    },
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    fileTree: {
        type: Object,
        default: {}
    },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;