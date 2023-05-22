const { MongoClient } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL);

async function findUser(username, password) {
  try {
    await client.connect();
    console.log('Connection OK!');
    const collection = client.db('MyTask').collection('users');
    const user = await collection.findOne({ username, password });
    return user;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function addUserToCollection(user) {
  try {
    await client.connect();
    console.log('Connection OK!');
    const collection = client.db('MyTask').collection('users');
    const existingUser = await collection.findOne({ username: user.username });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const now = new Date();
    user.dateInscription = now;
    await collection.insertOne(user);
    console.log('User added to collection');
  } catch (err) {
    console.log(err.stack);
    throw err;
  } finally {
    await client.close();
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

exports.signup = async function (req, res) {
  const { username, password, email } = req.body;
  // Validate input
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Password validation (you can add more rules here)
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password should be at least 6 characters long' });
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  // Create user object
  const user = { username, password, email };
  console.log('User ==>', user);

  // Add user to database
  try {
    await addUserToCollection(user);
    // Send response
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Error adding user to collection' });
  }
};
