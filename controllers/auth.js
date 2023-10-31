/* eslint-disable no-console */
const authModel = require('../models/auth');

const middleWare = require('../middle_ware/authverify')
const jwt = middleWare.jwt;

async function signup(req, res) {
    const { first_name, last_name, user_name, password, phone_number, address, dob, gender } = req.body;
    const exUser = await authModel.checkUser(user_name)
    const user = exUser[0]
    if (first_name != "" || last_name != "" || user_name != "" || password != "" || phone_number != "" || address != "" || dob != "" || gender != "") {
        const containsKey = user.some(obj => obj.hasOwnProperty('user_name'));
        if (containsKey) {
            console.log("Error ")
            res.status(500).send("user user_name already exsist, change the user name and try again")
        } else {
            const newUser = {
                first_name,
                last_name,
                user_name,
                password,
                phone_number,
                address,
                dob,
                gender,
            };
            try {
                await authModel.createUser(newUser);
                const data = {
                    message: 'User registered successfully',
                    status: 200,
                    success: true
                };
                res.status(201).json(data);
            } catch (error) {
                const data = {
                    message: 'User registered failed',
                    status: 500,
                    success: false
                };
                res.status(500).send(data);

            }
        }
    } else {
        console.log("some values are null")
        const data = {
            message: 'Some values are null',
            status: 500,
            success: false
        };
        res.status(500).send(data);
    }
}
async function login(req, res) {
    try {
        const { testUsername, testPassword } = await req.body;
        if (testUsername == undefined || testPassword == undefined) {
            const data = {
                message: 'Authentication failed',
                status: 500,
                success: false
            };
            res.status(500).send(data);
        }
        console.log(testUsername);
        console.log(testPassword);
        const result = await authModel.queryUser(testUsername, testPassword);
        console.log(result[0])
        const results = result[0]
        console.log(results)

        if (result[0].length == 0) {
            const data = {
                message: 'Login failed',
                status: 500,
                success: false
            };
            res.status(500).send(data);

        } else {
            console.log(results[0].id)
            console.log(results[0].user_name)
            let resp = {
                id: await results[0].id,
                user_name: await results[0].user_name
            };
            let token = jwt.sign(resp, "asdfghjkl1234567890qwertyuiop1234567890-qwertyuiopasdfghjklzxcvbnm,asdfghjklwertyuio234567890-qwertyuiopasdfghjkla3w4sex5dcr6tv7byuhnim2aes4dr5tf6g7y8hu9jik3w4xe5rctf6yubhjim", { expiresIn: 86000000000000 });
            const data = {
                message: 'Login is completed',
                auth: true,
                token: token,
                status: 200,
                success: true
            };
            res.status(200).send(data);
        }

    }
    catch (error) {
        const data = {
            message: 'An error occured at login',
            status: 500,
            success: false
        };
        res.status(200).send(data);
        console.log("An error occured at login")
    }
}


module.exports = {
    signup,
    login,
};
