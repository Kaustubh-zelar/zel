import mongoose from 'mongoose';

const CardDescriptionSchema = new mongoose.Schema({
    key: {
        type: String,
        enum: ['Announcements', 'Birthdays', 'Trainings', 'Tasks'], // Ensure only valid keys are allowed
        required: true,
    },
    descriptions: {
        type: [String],
        required: true,
    },
});

export default mongoose.models.CardDescription || mongoose.model('CardDescription', CardDescriptionSchema);
