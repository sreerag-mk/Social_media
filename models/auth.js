
const connection = require('../config/database')


async function createUser(newUser) {
    try {
        const con = await connection.databaseConnection()
        await con.query(
            'INSERT INTO user (first_name, last_name, user_name, password, phone_number, address, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                newUser.first_name,
                newUser.last_name,
                newUser.user_name,
                newUser.password,
                newUser.phone_number,
                newUser.address,
                newUser.dob,
                newUser.gender,
            ]
        );
        con.end()
        return true
    }
    catch (error) {
        return false
    }
}

async function checkUser(user_name) {
    const con = await connection.databaseConnection()
    let qr = `select user_name from user where user_name="${user_name}"`
    const results = await con.query(qr)
    con.end()
    return results
}


async function queryUser(username, password) {
    try {
        const con = await connection.databaseConnection()
        let qr = `select id, user_name from user where user_name= ? and password = ?`;
        const results = con.query(qr, [username, password])
        con.end()
        return results
    }
    catch (error) {
        return error
    }
}

async function deleteUser(userId, password) {
    try {
        const con = await connection.databaseConnection();
        let qr = 'UPDATE User SET deleted = true WHERE id = ? and password = ?;'
        con.query(qr, [userId, password])
        con.end()
        return true
    }
    catch (error) {
        return false
    }
}

module.exports = {
    createUser,
    queryUser,
    checkUser,
    deleteUser,
}
