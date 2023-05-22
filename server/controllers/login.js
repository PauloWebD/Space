const { MongoClient } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL);

async function findUser(username, password) {
    try {
        await client.connect();
        console.log('Connection OK!');
        const collection = client.db('MyTask').collection('users');
        // console.log('Collection ==> ', collection);
        const user = await collection.findOne({ username, password });
        // console.log('User ==> ', user);
        return user;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

exports.login = async function (req, res) {
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Find user in database
    try {
        const user = await findUser(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Send response
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message: 'Error finding user in collection' });
    }
};