const express   = require('express');
const app       = express();
const path      = require('path');

const PORT      = 8080;     //default web port http://192.18.19:80

let Receipts = [];

let ids = 1;


app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/api/receipts', (req,res) => {

    res.status(200).json(Receipts);


})
app.get('/api/receipts/:id', (req, res) => {

    const id = parseInt(req.params.id,10);
    const receipt = Receipts.find(o => o.id === id);

    if(receipt){
      res.status(200).json(receipt)

    } else {
      res.status(404).json({error: "Order not found"})
    }




})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/order.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/menu.html'));
});

app.post('/api/receipts', express.json(), (req, res) => {
    const newOrder = req.body;
    
    if(!newOrder){
      return res.status(400).json({msg:"Nothing Ordered"})

    }

    console.log("Order Recieved", newOrder)

    newOrder.id = ids++
    Receipts.push(newOrder);
    console.log(Receipts);
    res.status(201).json({ msg:"Order Recieved", order: newOrder

    });
});


//starts server
app.listen(PORT, () => { console.log("Server started on port: " + PORT) });