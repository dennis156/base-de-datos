import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import User from "./models/user.js";

const app = express();
const port = 3000;

/* mongoose.connect(process.env.DATABASE_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */

app.use(express.json())

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});


app.put('/', (req, res) => {
  res.send('How are you?');
});

app.delete('/', (req, res) => {
  res.send('run on');
});

app.post('/user',async (req,res)=> {
    const { email, name, age } = req.body;

    try{
        const user = await User.create ({email,name ,age});
        res.status(200).json({message: 'User created successfully', data:user});
    } catch (error) {
        res.status(500).json ({message: 'Server error', error: error.message});
    }
})


app.listen(port,()=>{
    console.log("corriendo servidor")
})