/* eslint-disable prefer-destructuring */
const userModel = require('../models/model');

async function addBio(req, res) {
    console.log("hello world")
    try {
        const userId = await req.user.id;
        const newBio = req.body.newBio;
        console.log(newBio)
        await userModel.addingBio(userId, newBio);
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
        console.log(error)
    }
}


async function editBio(req, res) {
    try {
        const userId = await req.user.id;
        const newBio = req.body.newBio;
        await userModel.editingBio(userId, newBio);
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