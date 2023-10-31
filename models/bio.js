const connection = require('../config/database')

async function addingBio(userId, newBio) {
    try {
        console.log("inside")
        const con = await connection.databaseConnection()
        await con.query(
            `update user set bio = "${newBio}" where id = ${userId};`
        )

    }
    catch (error) {
        console.log(error)
    }
}

async function editingBio(userId, newBio) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            `update user set bio = "${newBio}" where id = ${userId};`
        )
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    addingBio,
    editingBio,
}
