const dbConnect = require('../../lib/dbConnect');
const User = require('../../models/Users')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await dbConnect();

    const { email, emojiSequence } = req.body;

    try {
        const userid = crypto.randomBytes(16).toString('hex');
        const salt = await bcrypt.genSalt(10);
        const hashed_emoji_sequence = await bcrypt.hash(emojiSequence, salt);

        const user = new User({
            userid,
            email,
            hashed_emoji_sequence,
            salt,
            login_websites: [],
        });
        console.log(user);
        await user.save();

        res.status(201).json({ message: 'User created successfully', userid });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
}