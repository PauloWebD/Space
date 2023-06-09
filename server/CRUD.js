require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);


async function main() {
    await client.connect();
    console.log('connection OK !!');
    const db = client.db('MyTask');
    const collection = db.collection('Message');


    // Create
    try {
        const inserData = await collection.insertMany([
            {
                UserId: '646cd27cc485b235b69f12f9',
                message: 'test message ',

            },

        ]);
    } catch (e) { throw e; }




    return "done!";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());