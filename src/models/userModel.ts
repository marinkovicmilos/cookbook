import mongoose from 'mongoose';

export interface IUser extends Document {
    username: string;
    passwordHash: string;
    role: 'user' | 'admin';
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);
