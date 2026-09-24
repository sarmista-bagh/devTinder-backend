const { MongoClient } = require("mongodb")



const url = "mongodb+srv://sarmistabagh88_db_user:aso4hf1cyV532Juk@nodejs.rbdthal.mongodb.net/"



const client = new MongoClient(url);

const dbName = "Testing";

async function main() {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("User");

    const data = [{
        name: "Sarmi",
        Role: "Mern Stack developer",
        salary: "permonth two lakh Thank you jesuse my papa"
    }];

    //insert data
    const insertResult = await collection.insertMany(data);
    console.log('Inserted data:', insertResult);
    //Read Data from database

    const findResult = await collection.find().toArray();
    console.log("Find data From Database", findResult);


    return "done.";
}

main().then(console.log)
    .catch(console.log)
    .finally(() => client.close());

















//Notes
//sarmistabagh88_db_user (Mongodb user name)
//aso4hf1cyV532Juk (Mongodb Atlas password)
//Go to Mongodb website
//Create a free M0 cluster
//Create User
//Get the connection string

//install MongoDB compass


//npm mongodb(search it for more information)