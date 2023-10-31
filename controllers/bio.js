/* eslint-disable prefer-destructuring */
const bioModel = require('../models/bio');

async function addBio(req, res) {
    try {
        const userId = await req.user.id;
        const newBio = req.body.newBio;
        await bioModel.addingBio(userId, newBio);
        const data = {
            message: 'User added bio successfully',
            status: 200,
            success: true
        };
        res.status(201).json(data);

    }
    catch (error) {
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
        console.log("an error at addbio")
    }
}


async function editBio(req, res) {
    try {
        const userId = await req.user.id;
        const newBio = req.body.newBio;
        await bioModel.editingBio(userId, newBio);
        const data = {
            message: 'User updated bio successfully',
            status: 200,
            success: true
        };
        res.status(201).json(data);

    }
    catch (error) {
        const data = {
            message: 'Error occured',
            status: 500,
            success: false
        };
        res.status(500).send(data)
        console.log("an error at editbio")
        console.log(error)
    }
}



module.exports = {
    addBio,
    editBio
}