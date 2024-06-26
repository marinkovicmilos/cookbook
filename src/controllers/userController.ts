import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

export const login = async (request: any, reply: any): Promise<string> => {
    const { username, password } = request.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return reply.status(401).send({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username, role: 'admin' }, process.env.JWT_SECRET_KEY as string);
        return token;
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};

export const createDefaultUser = async (): Promise<void> => {
    const username = 'somi';

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            const passwordHash = await bcrypt.hash('123', 10);

            const newUser = new User({
                username,
                passwordHash
            });

            await newUser.save();
            console.log('Default user created successfully');
        } else {
            console.log('Default user already exists');
        }
    } catch (error) {
        console.error('Error creating default user:', error);
    }
};
