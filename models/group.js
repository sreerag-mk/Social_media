const connection = require('../config/database');

async function createGroup(newGroup) {
    try {
        const con = await connection.databaseConnection();
        await con.query(` insert into grp(name, details, admin_user_id) values ("${newGroup.name}", "${newGroup.details}", ${newGroup.userId});  `)
        con.end()
        return true
    } catch (error) {
        return false
    }
}

async function checkUser(newGroup) {
    try {
        const con = await connection.databaseConnection()
        const grpId = await con.query(`select id from grp where admin_user_id = ${newGroup.userId} and id = ${newGroup.id};`)
        const newGrpId = grpId[0][0].id
        con.end()
        return newGrpId
    }
    catch (error) {
        return false
    }
}

async function deleteGroup(grpId) {
    try {
        const con = await connection.databaseConnection()
        await con.query(`delete from grp where id = ${grpId}`)
        con.end()
        return true
    }
    catch (error) {
        return false
    }
}

async function addUser(newGroup) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`insert into grpmembership(user_id, group_id) values(${newGroup.user}, ${newGroup.id});`)
        con.end()
        return true
    }
    catch (error) {
        return false
    }
}

async function deleteUser(newGroup) {
    try {
        const con = await connection.databaseConnection();
        await con.query(`delete from grpmembership where user_id = ${newGroup.user} and group_id=${newGroup.id} `)
        con.end()
        return true
    }
    catch (error) {
        return false
    }
}

module.exports = {
    createGroup,
    deleteGroup,
    checkUser,
    addUser,
    deleteUser,
}