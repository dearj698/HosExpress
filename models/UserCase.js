const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCaseSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    operationType: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    anatheria: {
        type: String,
        required: true
    },
})
mongoose.model('usercase', UserCaseSchema);