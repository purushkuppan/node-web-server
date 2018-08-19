const express = require('express')
const hbs = require('hbs')
const fs1 = require('fs')


var app = express();

app.set( 'hbs')

hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper('getCopyRight', ()=>
{
    return new Date().getFullYear()
})

hbs.registerHelper('upper', (text)=>
{
    return text.toUpperCase();
})

app.use(express.static(__dirname+'/public'))

app.use((req, res, next) =>{
    var now =new Date().toString();
    var log = `${now}`+`${req.method}`+`${req.url}` + '\n'
    fs1.appendFile('serverlog.log', `${log}` , (err) => {
        console.log('Unable to load')
    })

    next()
})


app.use((req, res, next) =>{
    res.render('maintain.hbs')
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
        name: 'Purush',
        likes : ['Bike', 'car'],
        pageName : 'Home page',
        copyRight : new Date().getFullYear()
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageName : 'Express about page',
        copyRight : new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error :'unable to load google'
    });
})

app.listen(4000, () => {
    console.log ('App started-->')
});