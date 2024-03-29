const express = require('express');
const router = express.Router();
const userModel = require('../database/Models/userModel');
const moment = require('moment')

router.get('/', (req, res)=> {
    userModel.find().then(result => {
        res.status(200).send({users: result});
    });
});

router.get('/:id', (req, res)=> {
    userModel.find({id: req.params.id}).then(result => {
        res.status(200).send({user: result});
    });
});

router.post('/', (req, res) => {
    if(req && req.body !== undefined) {
        userModel.find().then(result => {
            let data = req.body.user;
            data.id = result.length +1; 
            data.createdDate = moment().toDate().toISOString();
            data.status = 'Active';
            let user = new userModel(data);
            user.save().then(r => {
                res.status(200).send({msg: "User saved", status: "Success"});
            }).catch(err => res.status(400).send({status: "Error", msg: "User not saved"}));
        });
    }
});

router.put('/', (req, res) => {
    if(req && req.body !== undefined) {
        let data = req.body.user;
        data.updatedDate = moment().toDate().toISOString();
        userModel.updateOne({id: data.id}, data).then(r => {
            res.status(200).send({msg: "User Updated", status: "Success"});
        }).catch(err => res.status(400).send({status: "Error", msg: "User not saved"}));
    }
});


module.exports = router;