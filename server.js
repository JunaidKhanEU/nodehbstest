var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));


app.use(function(req,res,next){

    var log = `method: ${req.method} & url : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log(err);
        }
    });

next();
});

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('copy', ()=>{
    return `CopyRight @ ${new Date().getFullYear().toString()}`;
})

app.get('/', (req,res)=>{
   res.render('app.hbs');
});

app.get('/about', (req,res)=>{
    res.send('<h1>About Page</h1>');
    
});

app.listen(3000, ()=>{
    console.log('server is running at port 3000');
})