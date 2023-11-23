/* eslint-disable no-prototype-builtins */
const authModel = require('../models/models');

const middleWare = require('../../middle_ware/authverify');
const { jwt } = middleWare;
require('dotenv').config();

const adminToken = process.env.adminToken;



async function reportedUser(req, res) {
    try {
        const report = await authModel.report();
        const data = {
            message: report,
            success: true
        };
        res.status(200).send(data)
    }
    catch (error) {
        return false
    }
}
async function editVerifieduser(req, res) {
    try {
        const { user, status } = req.body;
        if (user != "") {
            const userCheck = await authModel.userCheck(user);
            if (userCheck) {
                await authModel.editUser(user, status)
                const data = {
                    message: 'User status edited succesfully',
                    success: true
                };
                res.status(200).send(data)
            } else {
                const data = {
                    message: 'No user found',
                    success: false
                };
                res.status(500).send(data)
            }

        } else {
            const data = {
                message: 'enter the user',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'An error occured at verifying user',
            success: false
        };
        res.status(500).send(data);
    }
}



async function disableUser(req, res) {
    try {
        const { user } = req.body;
        if (user != "") {

            await authModel.disableUser(user)
            const data = {
                message: 'User desabled succesfully',
                success: false
            };
            res.status(500).send(data)
        } else {
            const data = {
                message: 'enter the user',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'An error occured at desabling the user',
            success: false
        };
        res.status(500).send(data);
    }
}



async function deleteUser(req, res) {
    try {
        const { user } = req.body;
        if (user != "") {
            const userCheck = await authModel.userCheck(user);
            if (userCheck) {
                await authModel.deleteUser(user)
                const data = {
                    message: 'User Deleted succesfully',
                    success: false
                };
                res.status(500).send(data)
            } else {
                const data = {
                    message: 'No user found',
                    success: true
                };
                res.status(200).send(data)
            }
        } else {
            const data = {
                message: 'enter the user',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'An error occured at verifying user',
            success: false
        };
        res.status(500).send(data);
    }
}


async function verifyUser(req, res) {
    try {
        const { user } = req.body;
        if (user != "") {
            const userCheck = await authModel.userCheck(user);
            if (userCheck) {
                const data = {
                    message: 'User already exist',
                    success: false
                };
                res.status(500).send(data)
            } else {
                await authModel.verifyUser(user)
                const data = {
                    message: 'User verifies',
                    success: true
                };
                res.status(200).send(data)
            }
        } else {
            const data = {
                message: 'enter the user',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch (error) {
        const data = {
            message: 'An error occured at verifying user',
            success: false
        };
        res.status(500).send(data);
    }
}


async function login(req, res) {
    try {
        console.log("1")
        const { adminUsername, adminPassword } = req.body;
        if (adminUsername == undefined || adminPassword == undefined) {
            const data = {
                message: 'Authentication failed',
                success: false
            };
            res.status(500).send(data);
        }
        console.log("2")
        const pattern = /^[A-Za-z]+$/;
        if (!adminUsername.match(pattern)) {
            const data = {
                message: 'Only charecters are allowed as user name',
                success: false
            };
            console.log("3")
            res.status(500).send(data);

        } else {
            console.log("4")
            const result = await authModel.login(adminUsername, adminPassword);
            const results = result[0]

            if (result[0].length == 0) {
                const data = {
                    message: 'Login failed',
                    success: false
                };
                res.status(500).send(data);

            } else {
                console.log("5")
                let resp = {
                    id: await results[0].id,
                    admin_name: await results[0].adminname,
                    email: await results[0].email
                };
                let token = jwt.sign(resp, adminToken, { expiresIn: 86000000000000 });
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
        console.log(error)
        const data = {
            message: 'An error occured at login',
            success: false
        };
        res.status(500).send(data);
    }
}


module.exports = {
    login,
    verifyUser,
    deleteUser,
    editVerifieduser,
    reportedUser,
    disableUser,
}