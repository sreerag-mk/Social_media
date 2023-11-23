
const authModel = require('../models/auth');

const middleWare = require('../middle_ware/authverify')
const jwt = middleWare.jwt;


require('dotenv').config();
const userToken = process.env.userToken;

async function signup(req, res) {
    try {
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
    catch (error) {
        const data = {
            message: 'Error at sign up',
            success: false
        };
        res.status(500).send(data);
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.user.id
        const { password } = req.body;
        if (password != "") {
            console.log("inside ")
            await authModel.deleteUser(userId, password)
            const data = {
                message: 'Account deleted succesfully',
                success: true
            };
            res.status(200).send(data);
        } else {
            const data = {
                message: 'Plese enter the password',
                success: false
            };
            res.status(500).send(data);
        }
    }
    catch (error) {
        const data = {
            message: 'Error at deleting user',
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
            console.log(results[0])

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
                let token = jwt.sign(resp, userToken, { expiresIn: 86000000000000 });
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
    deleteUser,
};
