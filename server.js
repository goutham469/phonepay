const exp = require('express');
const app = exp();
const { MongoClient } = require('mongodb');
const cors = require('cors')

MongoClient.connect('mongodb+srv://social_admin:social_admin@cluster0.zn5gmwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(client => {
    const DB = client.db('phonepay');
    const usersCollection = DB.collection('users');
    
    app.set('usersCollection', usersCollection);

    console.log('MongoDB connection successful');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if the DB connection fails
  });


app.use(exp.json());
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hi Goutham.\n I am running for Payment App');
});

app.post('/createUser', async (req, res) => {
  const usersCollection = req.app.get('usersCollection');
  try {
    const response = await usersCollection.insertOne({
      email: req.body.email,
      balance: 0,
      pin: req.body.pin,
      history: []
    });
    res.send(response);
  } catch (err) {
    res.status(500).send({ error: 'Error creating user' });
  }
});

app.get('/getAllUsers',async(req,res)=>{
    const usersCollection = req.app.get('usersCollection');
  try {
    const response = await usersCollection.find().toArray();
    res.send(response);
  } catch (err) {
    res.status(500).send({ error: 'Error creating user' });
  }
})

app.post('/checkUser',async(req,res)=>{
    const usersCollection = req.app.get('usersCollection');
  try {
    const response = await usersCollection.find({"email":req.body.email}).toArray();
    res.send(response[0]);
  } catch (err) {
    res.status(500).send({ error: 'Error creating user' });
  }
})

app.post('/getUserData', async (req, res) => {
  const usersCollection = req.app.get('usersCollection');
  try {
    const response = await usersCollection.find({ email: req.body.email }).toArray();
    if (response) {
      res.send(response[0]);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Error fetching user data' });
  }
});

app.post('/recharge', async (req, res) => {
  const usersCollection = req.app.get('usersCollection');
  try {
    const response = await usersCollection.updateOne(
      { email: req.body.email },
      { $inc: { balance: req.body.rechargeAmount } }
    );
    if (response.modifiedCount === 1) {
      res.send({ message: 'Recharge successful' });
    } else {
      res.status(404).send({ error: 'User not found or recharge failed' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Error processing recharge' });
  }
});

app.post('/transaction', async (req, res) => {
    const usersCollection = req.app.get('usersCollection');

    let data = await usersCollection.find({"email":req.body.sender}).toArray();
    data = data[0]
    console.log(data)
    if(data.balance > 0 && data.balance >= req.body.transactionAmount)
    {
        try {
            const senderUpdate = await usersCollection.updateOne(
              { email: req.body.sender },
              { $inc: { balance: -Number(req.body.transactionAmount) } }
            );
        
            const receiverUpdate = await usersCollection.updateOne(
              { email: req.body.receiver },
              { $inc: { balance: Number(req.body.transactionAmount) } }
            );
        
            res.send({ message: 'Transaction successful', senderUpdate, receiverUpdate });
          } catch (err) {
            res.status(500).send({ error: 'Error processing transaction',"error_message":err });
          }
    }
    else
    {
        res.status(500).send({ error: 'Error processing transaction',"error_message":"insufficient_balance" });
    }
    
  
    
});
  

app.listen(4000, () => {
  console.log('Server running on port 4000...');
});
