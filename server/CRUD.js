require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);


async function main() {
    await client.connect();
    console.log('connection OK !!');
    const db = client.db('MyTask');
    const collection = db.collection('users');


    // Create
    // try {
    //     const inserData = await collection.insertMany([
    //         {
    //             username: 'Alex',
    //             password: 'popopo',

    //         },
    //         {
    //             name: 'Päul',
    //             age: 20,
    //             sexe: 'Masculmin',
    //             hobby: 'Coding'
    //         },
    //         {
    //             name: 'Damien',
    //             age: 25,
    //             sexe: 'Masculmin',
    //             hobby: 'Foot'
    //         },
    //         {
    //             name: 'Justine',
    //             age: 34,
    //             sexe: 'Femme',
    //             hobby: 'Gaming , Coding'
    //         }
    //     ]);
    //     console.log('Document insérés => ', inserData);
    // } catch (e) { throw e; }



    // Read
    // try {
    //     const findData = await collection.findOne({ username: 'Mhbeat' });
    //     console.log('Document trouvé: ', findData);


    //     //     // const findData = await collection.findOne({ name: 'Justine' });
    //     //     // console.log('Document trouvé: ', findData);

    //     //     const findMultipleData = await collection.find({ age: 30 });
    //     //     console.log(await findMultipleData.toArray());

    // } catch (e) { throw e; }



    // // Update
    // try {
    //     //     const updateAlex = collection.updateOne({ name: 'Alex' }, {
    //     //         $set: { name: 'Maiwenn', sexe: 'Féminin' }
    //     //     });
    //     //     console.log(await updateAlex);
    // } catch (e) { throw e; }


    // Delete
    // Delete
    // try {
    //     const deleteEveryone = await collection.deleteMany({});
    //     console.log(deleteEveryone.deletedCount + " documents supprimés");
    // } catch (e) { throw e; }



    return "done!";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());