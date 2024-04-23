//require

const express =require('express');
const cors = require('cors');
const {ObjectId,MongoClient,ServerApiVersion} = require('mongodb');
require('dotenv').config();
//port
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

//mongodb

//fullStactDemo
//IPPeUrRQRRq1gyPQ

const uri = "mongodb+srv://fullStactDemo:IPPeUrRQRRq1gyPQ@cluster0.si6lvvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run(){
    try{
        //DB Collection
        const userCollection = client.db('FullStackDemo').collection('users');
        const carCollection = client.db('FullStackDemo').collection('cars');

        //Read(get)
        app.get('/users',async(req,res)=>{
            let query = {};
            const cursor =userCollection.find(query);
            const a = await cursor.toArray();
            res.send(a);
        });

        //Create(post)
        app.post('/users',async(req,res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })
    } 
    finally{

    }

}
run().catch(err=>console.error(err))

//runing
app.get('/',(req,res)=>{
    res.send('Demon Backend Running')
})
app.listen(port, ()=>{
    console.log(`Demo Project is Running in ${port}`);
})