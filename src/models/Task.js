const mongoose = require ('mongoose');

//defined task schema
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority:{
        type: String,
        enum: ['low', 'medium', 'high'],
        defualt: 'low',
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{
     timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;