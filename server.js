const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost/pets_db');
const STRING = Sequelize.STRING;

const Pet = sequelize.define('pet',{
    name:{
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    species:{
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    birthday:{
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const express = require('express');
const app = express();
const path = require('path');

app.get('/pets', async(req,res,next)=>{
    try{
        const pets = await Pet.findAll();
        res.send(pets);
    }
    catch(err){
        next(err);
    }
});

app.get('/', async(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,'index.html'));
    }
    catch(err){
        next(err);
    }
});


const syncAndSeed = async()=>{
    try{
        await Pet.create({name: 'Milo', species: 'cat', birthday: 'May 5, 2016'});
        await Pet.create({name: 'Harley', species: 'cat', birthday: 'March 23, 2014'});
        await Pet.create({name: 'Rotini', species: 'ferret', birthday: 'December 15, 2019'});
        await Pet.create({name: 'Tortellini', species: 'ferret', birthday: 'May 15, 2020'});
        await Pet.create({name: 'Mr. Sniffles', species: 'hedgehog', birthday: 'January 17, 2019'});
        await Pet.create({name: 'Daenerys', species: 'bearded dragon', birthday: 'January 19, 2017'});
        await Pet.create({name: 'Toothless', species: 'axolotl', birthday: 'September 19, 2019'});
        await Pet.create({name: 'Mushu', species: 'axolotl', birthday: 'September 19, 2019'});
    }
    catch(err){
        console.log(err);
    }
};

const setUp = async()=>{
    try{
        await sequelize.sync({force: true});
        console.log('synced');

        syncAndSeed();
        
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on ${port}`));
    }
    catch(err){
        console.log(err);
    }
};

setUp();
