
const connection = require('../config/database');




async function login(username, password) {
    try {
        const con = await connection.databaseConnection()
        let qr = `select id, adminname, email from admin where adminname= ? and password = ?`;
        const results = con.query(qr, [username, password])
        con.end()
        return results
    }
    catch (error) {
        return false
    }
}

async function adminCheckForVerifying(admin, email) {
    try {
        const con = await connection.databaseConnection()
        let qr = 'SELECT * FROM admin_permissions inner join admin as admin on admin.id = admin_permissions.admin_id where admin_id = ? and admin.email = ? and permission_id = 4;'
        const result = await con.query(qr, [admin, email])
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

async function disableUser(user) {
    try {
        const con = await connection.databaseConnection()
        let qr = "UPDATE User SET status = 'Suspended' WHERE id = ?;"
        const result = await con.query(qr, [user])
        con.end()
        return true
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

async function report() {
    try {
        const con = await connection.databaseConnection();
        let qr = "SELECT r1.reported_user_id as user_id, u1.user_name as name, r1.reporter_user_id as reported_by , u2.user_name as reported_user_name, r1.reason, r1.modified_at as date, counts.report_count FROM report as r1 inner join user as u1 on r1.reported_user_id = u1.id inner join user as u2 on r1.reporter_user_id = u2.id left join (SELECT COUNT(id) AS report_count, reported_user_id FROM report GROUP BY reported_user_id ORDER BY reported_user_id) as counts on r1.reported_user_id = counts.reported_user_id;"
        const result = await con.query(qr)
        con.end()
        return result[0]

    }
    catch (error) {
        return false
    }
}

module.exports = {
    login,
    verifyUser,
    adminCheckForVerifying,
    userCheck,
    deleteUser,
    editUser,
    report,
    disableUser
}