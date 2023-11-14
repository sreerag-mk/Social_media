const connection = require('../config/database')

async function addingBio(userId, newBio) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            `update user set bio = "${newBio}" where id = ${userId};`
        )
        con.end()
        return true

    }
    catch (error) {
        return false
    }
}

async function editingBio(userId, newBio) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            `update user set bio = "${newBio}" where id = ${userId};`
        )
        con.end()
        return true
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    addingBio,
    editingBio,
}
