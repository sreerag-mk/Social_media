const groupModel = require('../models/group')

async function createGroup(req, res) {
    const userId = req.user.id;
    try {
        const { name, details } = req.body;
        const newGroup = {
            userId,
            name,
            details
        }
        await groupModel.createGroup(newGroup)
        const data = {
            message: 'group created!',
            success: true
        };
        res.status(200).send(data)
    }
    catch {
        const data = {
            message: 'An error occured at creating a group',
            success: false
        };
        res.status(500).send(data)
    }
}

async function deleteGroup(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.body;
        if (id != "") {
            const newGroup = {
                userId,
                id
            }
            const grpId = await groupModel.checkUser(newGroup)
            if (grpId == id) {
                await groupModel.deleteGroup(grpId);
                const data = {
                    message: 'group has been removed',
                    success: true
                };
                res.status(200).send(data)
            }
            else {
                const data = {
                    message: 'this user cant delete this group, only admin can delete!',
                    success: false
                };
                res.status(500).send(data)
            }
        }
        else {
            const data = {
                message: 'enter the id',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch {
        const data = {
            message: 'Error occured while deleting the group',
            success: false
        };
        res.status(500).send(data)
    }
}


async function addUser(req, res) {
    try {
        const userId = req.user.id;
        const { user, id } = req.body;
        if (user != "" && id != "") {
            const newGroup = {
                userId,
                user,
                id
            }
            const grpId = await groupModel.checkUser(newGroup);
            if (grpId == id) {
                await groupModel.addUser(newGroup)
                const data = {
                    message: 'user added to the group',
                    success: true
                };
                res.status(200).send(data)
            }
            else {
                const data = {
                    message: 'this user cant add users to this group, only admin can add!',
                    success: false
                };
                res.status(500).send(data)
            }
        }
        else {
            const data = {
                message: 'enter the id',
                success: false
            };
            res.status(500).send(data)
        }

    }
    catch {
        const data = {
            message: 'Error occured while adding user to the group',
            success: false
        };
        res.status(500).send(data)
    }
}

async function message(req, res) {

    try {
        const userId = req.user.id;
        const { id, content } = req.body;
        if (id != "" && content != "") {
            const newGroup = {
                userId,
                id,
                content
            }
            await groupModel.message(newGroup);
        }
    }
    catch {
        const data = {
            message: 'Error occured while messaging',
            success: false
        };
        res.status(500).send(data)
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.user.id;
        const { user, id } = req.body;
        if (id != "" && user != "") {
            const newGroup = {
                userId,
                id,
                user
            }
            const grpId = await groupModel.checkUser(newGroup)
            console.log(grpId)
            if (grpId == id) {
                await groupModel.deleteUser(newGroup);
                const data = {
                    message: 'User has been removed from this group',
                    success: true
                };
                res.status(200).send(data)
            }
            else {
                const data = {
                    message: 'this user cant remove anyone from this group, only admin can remove!',
                    success: false
                };
                res.status(500).send(data)
            }
        }
        else {
            const data = {
                message: 'enter the values',
                success: false
            };
            res.status(500).send(data)
        }
    }
    catch {
        const data = {
            message: 'Error occured while removing the user',
            success: false
        };
        res.status(500).send(data)
    }
}

function handleConnection(ws) {
    console.log('WebSocket connection established.');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received message:', message);
        // Process messages as needed
    });

    // Send a welcome message to the client
    ws.send('Welcome to the chat!');
}




module.exports = {
    createGroup,
    deleteGroup,
    addUser,
    deleteUser,
    message,
    handleConnection,
}