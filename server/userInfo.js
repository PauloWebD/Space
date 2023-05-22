const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL);


async function main() {
    await client.connect();
    console.log('connection OK !!');
    const db = client.db('MyTask');
    const collection = db.collection('users');

    try {
        const id = '644eda9f692830d91318f20d';
        const user = await collection.findOne({ _id: new ObjectId(id) });
        console.log('Document trouvé: ', user);
    } catch (e) {
        throw e;
    }
    return "done!";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
