const Group = require("../models/groupModel");
const UserGroup = require("../models/userGroup");
const User = require("../models/userModel");

module.exports.postGroupController = async (req, res) => {
    try {

        console.log(req.body);
        const { groupname, userList, tokenObj } = req.body;
        // userList.add(tokenObj.id);
        const list = new Set();
        userList.forEach(ele => list.add(ele));
        list.add(tokenObj.id);
        const data = await Group.create({ groupname, createdBy: tokenObj.id });
        console.log(`8`);
        let arr = Array.from(list);
        await data.addUsers(arr);
        const addadmin = await data.addAdmin(tokenObj.id);
        console.log(`18`);
        console.log(addadmin);
        res.json({ message: "post group controller", data });
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.getGroupController = async (req, res) => {
    console.log(req.body);
    const { tokenObj } = req.body;
    const groupList = await User.findAll({
        include: {
            model: Group,
            attributes: ['id', 'groupname', 'createdBy']
        },
        where: {
            id: tokenObj.id,
        },
        attributes: ['id', 'name', 'email', 'phone'],
    })
    res.json({ message: "get group controller", groupList });
}

module.exports.getGroupUserController = async (req, res) => {
    console.log(req.params);
    const groupdata = await Group.findByPk(req.params.id);
    const userList = await groupdata.getUsers({
        attributes: ['name', 'id']
    });
    const adminList = await groupdata.getAdmin();
    const list = []
    for (let i = 0; i < userList.length; i++) {
        var flag = true;
        for (let j = 0; j < adminList.length; j++) {
            if (adminList[j].id === userList[i].id) {
                list.push({ name: userList[i].name, id: userList[i].id, isAdmin: true })
                flag = false;
                break;
            }
        }
        if (flag)
            list.push({ name: userList[i].name, id: userList[i].id, isAdmin: false })
    }
    res.json({ message: 'get group admin route', userList: list });
}
//http://localhost:3000/group/admin?groupId=3&userId=4 => demostration of query params
module.exports.addGroupAdminController = async (req, res) => {
    try {
        console.log(req.query);
        const data = await Group.findByPk(req.query.groupId)
        const result = await data.addAdmin(req.query.userId)
        res.json({ message: 'add admin routes', data, result })
    } catch (error) {
        res.json({ message: error.message });
        throw error;
    }
}
module.exports.removeGroupAdminController = async (req, res) => {
    try {
        console.log(req.query);
        const data = await Group.findByPk(req.query.groupId)
        const result = await data.removeAdmin(req.query.userId)
        res.json({ message: 'remove group admin', data, result })
    } catch (error) {
        res.json({ message: error.message });
        throw error;
    }
}
module.exports.addGroupUserController = async (req, res) => {
    try {
        console.log(req.query);
        const data = await Group.findByPk(req.query.groupId)
        const result = await data.addUser(req.query.userId)
        res.json({ message: 'add admin routes', data, result })
    } catch (error) {
        res.json({ message: error.message });
        throw error;
    }
}
module.exports.removeGroupUserController = async (req, res) => {
    try {
        console.log(req.query);
        const data = await Group.findByPk(req.query.groupId)
        const result = await data.removeUser(req.query.userId)
        res.json({ message: 'remove group admin', data, result })
    } catch (error) {
        res.json({ message: error.message });
        throw error;
    }
}