var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

// Constructor/Object
var app = express();

// using JSON...
app.use(express.json());

// using cors

app.use(cors());

// Connection to mySQL...
var Connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'articlesdb'
});

// prove connection..
Connection.connect(function(error){
    if(error) {
        throw error;
    }else {
        console.log("Connection sussesful to the data base");
    }
});

app.get('/', function(req, res){
    res.send('Initial Route');
});

// invoke get here || show all articles ...
app.get('/api/article', (req, res)=> {
    Connection.query('SELECT * FROM article', (error,queque)=> {
        if(error) {
            throw error;
        }else {
            res.send(queque);
        }
    });
});

// Show only one article

app.get('/api/article/:Id', (req, res)=> {
    Connection.query('SELECT * FROM article WHERE id = ?', [req.params.Id] , (error,queque)=> {
        if(error) {
            throw error;
        }else {
            res.send(queque);
          // res.send(queque[0].description);
        }
    });
});

// POST value...

app.post('/api/article', (req, res) => {
    let data = {description:req.body.description, price:req.body.price, stock:req.body.stock};
    let sql = "INSERT INTO article SET ?";
    Connection.query(sql, data, function(error, results) {
        if(error) {
            throw error;
        }else {
            res.send(results);
        }
    });
});

// Edit article with PUT...

app.put('/api/article/:Id', (req, res)=> {
    let Id = req.params.Id;
    let description = req.body.description;
    let price = req.body.price;
    let stock = req.body.stock;
    let sql = "UPDATE article SET description = ?, price = ?, stock = ? WHERE Id = ?";
    Connection.query(sql, [description, price, stock, Id], function(error, results){
        if(error) {
            throw error;
        }else {
            res.send(results);
        }
    });

});

// Delete article DELETE...

app.delete('/api/article/:Id', (req, res) => {
    Connection.query('DELETE FROM article WHERE id = ?', [req.params.Id], function(error, queque){
        if(error) {
            throw error;
        }else {
            res.send(queque);
        }
    });
});


const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function() {
    console.log("server Ok in Port:"+puerto);
});

