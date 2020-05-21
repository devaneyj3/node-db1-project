const express = require('express');

const routes = express.Router();

const db = require("../data/dbConfig.js");

const middleware = require('./middleware');

routes.get('/', async(req, res) => {
    try {
        const getAllAccounts = await db('accounts');
        res.status(200).send(getAllAccounts)
    } catch {
        databaseError(res)
    }
})


routes.post('/', middleware.validateAccount, async(req, res) => {
    try {
       await db('accounts').insert(req.body)
        res.status(201).json(req.body)
    } catch {
        databaseError(res);
    }
})

routes.get('/:id', middleware.validateAccountId, async(req, res) => {
    const {id} = req.params
    try {
        const getPostById = await db('accounts').where({id}).first()
        res.status(200).send(getPostById)
    } catch {
        databaseError(res);
    }
})
routes.put('/:id', middleware.validateAccountId, middleware.validateAccount, async(req, res) => {
    const { id } = req.params;
    try {
        await db('accounts').where({id}).update(req.body)
        res.status(200).send(req.body)
    } catch {
        databaseError(res);
    }
})

routes.delete('/:id', middleware.validateAccountId, async(req, res) => {
    const { id } = req.params;
    try {
        const accountToDelete = await db('accounts').where({ id }).del()
        console.log(accountToDelete)
        res.status(200).send(id)
    } catch {
        databaseError(res);
    }
})


// HELPER FUNCTIONS
function databaseError(res) {
    return res.status(500).json({message: "There was an error with the database"})
}
module.exports = routes;