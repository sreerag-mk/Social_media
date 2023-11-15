
const connection = require('../config/database');




async function login(username, password) {
    try {
        const con = await connection.databaseConnection()
        let qr = `select id, username from admin where username= ? and password = ?`;
        const results = con.query(qr, [username, password])
        con.end()
        return results
    }
    catch (error) {
        return false
    }
}

async function adminCheckForVerifying(admin) {
    try {
        const con = await connection.databaseConnection()
        let qr = 'SELECT * FROM admin_permissions where admin_id = ? and permission_id = 4;'
        const result = await con.query(qr, [admin])
        con.end()
        return result
    }
    catch (error) {
        return false
    }
}

async function deleteUser(user) {
    try {
        const con = await connection.databaseConnection()
        let qr = 'DELETE FROM verified_user where user_id = ?'
        const result = await con.query(qr, [user])
        con.end()
        return result
    }
    catch (error) {
        return false
    }
}

async function editUser(user, status) {
    try {
        const con = await connection.databaseConnection()
        let qr = `UPDATE verified_user SET Status = ? WHERE user_id = ?;`;
        const result = await con.query(qr, [status, user])
        con.end()
        return result
    }
    catch (error) {
        return false
    }
}

async function userCheck(user) {
    try {
        const con = await connection.databaseConnection()
        let qr = `SELECT status FROM sreerag.verified_user where user_id = ?;`
        const results = await con.query(qr, [user])
        con.end()
        return results[0][0].status
    }
    catch (error) {
        return false
    }
}

async function verifyUser(user) {
    try {
        const con = await connection.databaseConnection()
        let qr = 'insert into verified_user(user_id) values(?);'
        await con.query(qr, [user])
        con.end();
        return true
    }
    catch (error) {
        return false;
    }
}

module.exports = {
    login,
    verifyUser,
    adminCheckForVerifying,
    userCheck,
    deleteUser,
    editUser
}