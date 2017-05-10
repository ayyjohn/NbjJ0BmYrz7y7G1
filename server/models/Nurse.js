import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Nurse = new Schema({
    salary: Number,
    patientNurseRatio: Number
});

export default mongoose.model('nurses', Nurse);

