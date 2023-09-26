const groupList = []
const url = 'http://localhost:3000'

const config = {
    headers: {
        Authorization: localStorage.getItem('token'),
    }
}

const searchBtn = document.getElementById('searchBtn');
const createGroupBtn = document.getElementById('createGroupBtn');

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const searchName = document.getElementById('searchName');
    const data = await axios.get(`${url}/user?name=${searchName.value}`)
    const listOfUsers = document.getElementById('listOfUsers');
    listOfUsers.innerHTML = "";
    console.log(data);
    data?.data?.data.map(ele => {
        displayUserList(ele);
    })
})

createGroupBtn.addEventListener('click',async(e)=>{
    e.preventDefault()
    const groupName = document.getElementById('groupName');
    const obj={
        groupname:groupName.value,
        userList:groupList,
    }
    const data=await axios.post(`${url}/group`,obj,config);
    console.log(data);
    const stringData=JSON.stringify(data?.data?.data);
    localStorage.setItem('groups',stringData);
    location=`${url}/index.html`
})

function displayUserList({ id, name }) {
    console.log(id);
    console.log(name);
    const listOfUsers = document.getElementById('listOfUsers');
    listOfUsers.innerHTML+=`<li id=`+`${id}`+`>`+`${name}`+
    `<button id=`+`btn${id}`+` onclick=`+`addtogroup(`+`${id}`+`)`+`>Add</button>`

}

function addtogroup(id){
    groupList.push(id);
    console.log(groupList);
}