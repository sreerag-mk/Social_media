
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
                    success: true
                };
                res.status(201).json(data);
            } catch (error) {
                const data = {
                    message: 'User registered failed',
                    success: false
                };
                res.status(500).send(data);

            }
        }
    } else {
        const data = {
            message: 'Some values are null',
            success: false
        };
        res.status(500).send(data);
    }
}


async function login(req, res) {
    try {

        const { testUsername, testPassword } = req.body;
        if (testUsername == undefined || testPassword == undefined) {
            const data = {
                message: 'Authentication failed',
                success: false
            };
            res.status(500).send(data);
        }
        const pattern = /^[A-Za-z]+$/;
        if (!testUsername.match(pattern)) {
            const data = {
                message: 'Only charecters are allowed as user name',
                success: false
            };
            res.status(500).send(data);

        } else {
            const result = await authModel.queryUser(testUsername, testPassword);
            const results = result[0]

            if (result[0].length == 0) {
                const data = {
                    message: 'Login failed',
                    success: false
                };
                res.status(500).send(data);

            } else {
                let resp = {
                    id: await results[0].id,
                    user_name: await results[0].user_name
                };
                let token = jwt.sign(resp, "asdfghjkl1234567890qwertyuiop1234567890-qwertyuiopasdfghjklzxcvbnm,asdfghjklwertyuio234567890-qwertyuiopasdfghjkla3w4sex5dcr6tv7byuhnim2aes4dr5tf6g7y8hu9jik3w4xe5rctf6yubhjim", { expiresIn: 86000000000000 });
                const data = {
                    message: 'Login is completed',
                    token: token,
                    success: true
                };
                res.status(200).send(data);
            }
        }

    }
    catch (error) {
        const data = {
            message: 'An error occured at login',
            success: false
        };
        res.status(500).send(data);
    }
}


module.exports = {
    signup,
    login,
};
