const url = 'http://localhost:3000'
const config = {
    headers: {
        Authorization: localStorage.getItem('token'),
    }
}
var globleGroupId = localStorage.getItem('groupAdminPage');
globleGroupId = globleGroupId.match(/(\d+)/);
globleGroupId = globleGroupId[0];
const inputtdl = document.querySelector('.textarea')
const buttontdl = document.querySelector('.buttoninput')
const listtdl = document.querySelector('.todolist')
window.addEventListener('DOMContentLoaded', async () => {
    console.log(`hello add event`);
    let groupid = localStorage.getItem('groupAdminPage');
    console.log(groupid);
    let id = groupid.match(/(\d+)/);
    console.log(id[0]);
    const data = await axios.get(`${url}/group/user/${id[0]}`, config);
    console.log(data);
    console.log(`15`);
    const listtdl = document.querySelector('.todolist')
    console.log(data?.data?.userList);
    await data?.data?.userList.map(async (ele) => {
        await addTodo(ele, listtdl);
    })
})


async function clickButton(e) {
    e.preventDefault()
    // addTodo()
    const searchName = document.querySelector('.textarea')

    // const searchName = document.getElementById('searchName');
    const data = await axios.get(`${url}/user?name=${searchName.value}`)
    const listOfUsers = document.getElementById('listOfUsers');
    listOfUsers.innerHTML = "";
    console.log(data);
    data?.data?.data.map(ele => {
        showUser(ele, listOfUsers);
    })
}

// adding todoList
function addTodo({ name, id, isAdmin }, listtdl) {
    console.log(name);
    const itemall = document.createElement('div')
    itemall.classList.add('itemall')

    const item = document.createElement('p')
    item.classList.add('item')
    item.id = `admin${id}`;
    item.innerText = name;
    console.log(item);
    itemall.appendChild(item)
    console.log(itemall);

    // if (inputtdl.value === '') return

    const removeAdminBtn = document.createElement("button")
    removeAdminBtn.innerHTML = 'Remove Admin';
    removeAdminBtn.addEventListener('click', removeAdmin);
    itemall.appendChild(removeAdminBtn)
    const addAdminBtn = document.createElement("button")
    addAdminBtn.innerHTML = 'Add Admin';
    addAdminBtn.addEventListener('click', addAdmin)
    itemall.appendChild(addAdminBtn)
    if (isAdmin) {
        addAdminBtn.style.display = "none";
    }
    else {
        removeAdminBtn.style.display="none";
    }
    // removeAdminBtn.classList.add("check-button")

    const trashbutton = document.createElement("button")
    trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    trashbutton.addEventListener('click', removeUser);
    trashbutton.classList.add("trash-button")
    itemall.appendChild(trashbutton)
    trashbutton.addEventListener('click',removeUser);
    listtdl.appendChild(itemall)
    inputtdl.value = ''
}
function showUser({ name, id, isAdmin }, listtdl) {
    console.log(name);
    const itemall = document.createElement('div')
    itemall.classList.add('itemall')

    const item = document.createElement('p')
    item.classList.add('item')
    item.id = `user${id}`;
    item.innerText = name;
    console.log(item);
    itemall.appendChild(item)
    console.log(itemall);

    // if (inputtdl.value === '') return
    const addUserBtn = document.createElement("button")
    addUserBtn.innerHTML = 'Add User';
    addUserBtn.addEventListener('click', addAdmin)
    itemall.appendChild(addUserBtn)
    // removeAdminBtn.classList.add("check-button")
    addUserBtn.addEventListener('click',addUser);
    listtdl.appendChild(itemall)
    inputtdl.value = ''
}
// checking and delete todoList 
function okdel(e) {
    const item = e.target

    // check
    if (item.classList[0] === 'check-button') {
        console.log(item);
        item.addEventListener('click', hi);
        const todolist = item.parentElement
        todolist.classList.toggle('checklist')
    }

    // delete
    if (item.classList[0] === 'trash-button') {
        console.log(item);
        item.addEventListener('click', hi);
        const todolist = item.parentElement
        todolist.remove()
    }
}

buttontdl.addEventListener('click', clickButton)
listtdl.addEventListener('click', okdel)

// `${url}/group/admin/removeuser?groupId=1&userId=2`
// add karne pe user add ho jaye => add/user
// delete karne par user delete ho jaye => remove/user
// add karne par admin add ho jaye => add/admin
// remove karne par admin remove ho jaye =>remove/admin

async function removeAdmin(e) {
    try {
        const element = e.target.parentElement;
        const p = element.querySelector('p');
        console.log(p.id);
        let userId = p.id.match(/(\d+)/);
        userId=userId[0];
        const data = await axios.delete(`${url}/group/admin/removeadmin?groupId=${globleGroupId}&userId=${userId}`, config)
        console.log(data);
        alert('remove from the admin');
    } catch (error) {
        console.log(error.message);
    }
}
async function removeUser(e) {
    try {
        const element = e.target.parentElement;
        const p = element.querySelector('p');
        console.log(p.id);
        let userId = p.id.match(/(\d+)/);
        console.log(userId[0]);
        userId=userId[0];
        const data = await axios.delete(`${url}/group/admin/removeuser?groupId=${globleGroupId}&userId=${userId}`, config)
        console.log(data);
        alert('remove from the group');
    } catch (error) {
        console.log(error.message);
    }
}
async function addAdmin(e) {
    try {
        const element = e.target.parentElement;
        const p = element.querySelector('p');
        console.log(p.id);
        let userId = p.id.match(/(\d+)/);
        console.log(userId[0]);
        userId=userId[0];
        const data = await axios.get(`${url}/group/admin/addadmin?groupId=${globleGroupId}&userId=${userId}`, config)
        console.log(data);
        alert('added to admin');
    } catch (error) {
        console.log(error.message);
    }
}
async function addUser(e) {
    try {
        const element = e.target.parentElement;
        const p = element.querySelector('p');
        console.log(p.id);
        let userId = p.id.match(/(\d+)/);
        console.log(userId[0]);
        userId=userId[0];
        const data = await axios.get(`${url}/group/admin/adduser?groupId=${globleGroupId}&userId=${userId}`, config)
        console.log(data);
        alert('added to user');
    } catch (error) {
        console.log(error.message);
    }
}