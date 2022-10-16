const express=require('express');

const app=express();

app.listen(3000);

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=> {
    res.render('./index',{root: __dirname});
});

var items={};

var index=0;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

const fs = require('fs');

fs.writeFile('public/data.txt', "", (err) => {
    if (err) throw err;
});

fs.readFile("public/data.txt", 'utf8', (err, data) => {
    if (err) throw err;

    if(data!="") {
        items=JSON.parse(data);
    }
});

app.post('/soundbyte',(req,res)=> {
    items[index]={"seed":req.body.seed,"stars":req.body.stars,"id":req.body.id};

    fs.writeFile('public/data.txt', JSON.stringify(items), (err) => {
        if (err) throw err;
    });

    index++;

    res.json(getBest());
});

app.get('/soundbyte',(req,res)=> {
    res.json(items[0]);
});

function getBest() {
    var best=0;
    var counter=0;

    let bests=[];

    let bestIndex=0;

    while(true) {
        if(items[String(counter)]!=null) {
            if(items[String(counter)]["stars"]>best) {
                best=items[String(counter)]["stars"];
                bests=[];

                bests[0]=[counter,items[counter]["id"]];

                bestIndex=1;
            }

            else if(items[String(counter)]["stars"]==best) {
                bests[bestIndex]=[counter,items[counter]["id"]];

                bestIndex++;
            }

            counter++;
        }

        else {
            break;
        }
    }

    return bests;
}