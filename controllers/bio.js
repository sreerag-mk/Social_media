/* eslint-disable prefer-destructuring */
const bioModel = require('../models/bio');

async function addBio(req, res) {
    try {
        const userId = req.user.id;
        const newBio = req.body.newBio;
        await bioModel.addingBio(userId, newBio);
        const data = {
            message: 'User added bio successfully',
            success: true
        };
        res.status(201).json(data);

    }
    catch (error) {
        const data = {
            message: 'Error occured',
            success: false
        };
        res.status(500).send(data)
    }
}


async function editBio(req, res) {
    try {
        const userId = req.user.id;
        const newBio = req.body.newBio;
        await bioModel.editingBio(userId, newBio);
        const data = {
            message: 'User updated bio successfully',
            success: true
        };
        res.status(201).json(data);

    }
    catch (error) {
        const data = {
            message: 'Error occured',
            success: false
        };
        res.status(500).send(data)
    }
}



module.exports = {
    addBio,
    editBio
}