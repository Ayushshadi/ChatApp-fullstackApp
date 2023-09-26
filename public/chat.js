const url = 'http://localhost:3000'
const config = {
    headers: {
        Authorization: localStorage.getItem('token'),
    }
}
var currentGroupId;
const displayMessage = (name, message, id) => {
    const messageList = document.getElementById('messageList');
    let element = document.createElement('div')
    element.id = id;
    if (name === "You" || name === localStorage.getItem('userName'))
        element.className = "chat__main-msg chat__main-msg-me"
    else
        element.className = "chat__main-msg chat__main-msg-user"
    element.innerHTML = `${name}: ${message}`
    messageList.appendChild(element);
}

window.addEventListener('DOMContentLoaded', async () => {
    getGroupList();
    // await refresh();
})
// async function refresh() {
//     let id = 1;
//     let messages = localStorage.getItem('messages');
//     if (messages !== '' && messages !== null) {
//         console.log(`hii`);
//         // message display
//         messages = JSON.parse(messages);
//         messages.map(ele => {
//             displayMessage(ele?.name, ele?.message, ele?.id);
//         })
//         id = messages[messages.length - 1]?.id;
//     }
//     if (messages === '' || messages === null) {
//         messages = [];
//     }
//     console.log(messages);
//     console.log(id);
//     await getMessageById(id);
// }
function isMessage() {
    let messages = localStorage.getItem('messages');
    if (messages === '' || messages === null)
        return false;
    return true;
}
async function getMessageById(groupId, id,divN) {
    // let messages = [];
    // if (isMessage()) {
    //     messages = localStorage.getItem('messages');
    //     messages = JSON.parse(messages);
    // }
    // let groupId;
    // let groupList = localStorage.getItem('groupList');
    // if (groupList !== null) {
    // groupId = JSON.parse(groupList).id;
    const messageList = document.getElementById('messageList');
    const groupName=document.querySelector('.chat__header-name');
    console.log(groupName);
    groupName.id=`groupName${groupId}`;
    groupName.addEventListener('click',getAdmin);
    messageList.innerHTML = "";
    const data = await axios.get(`${url}/message/chats/?groupId=${groupId}&id=${id}`, config)//we need to pass as a query not as params
    console.log(data);
    groupName.innerHTML=`${data?.data?.data[0]?.group?.groupname}`;
    (data?.data?.data).map((ele) => {
        console.log(ele);
        const obj = {
            id: ele?.id,
            name: ele?.User?.name,
            message: ele?.message,
        }
        console.log(obj);
        
        // messages.push(obj)
        displayMessage(ele?.User?.name, ele?.message, ele?.id);
    })
    // console.log(messages);
    //     let message = JSON.stringify(messages);
    //     localStorage.setItem("messages", message)
    // }
}
async function getGroupList(e) {
    let list = localStorage.getItem('groupList');
    console.log(list);
    if (list === null || list === undefined || list==='[]') {
        console.log(e);
        const data = await axios.get(`${url}/group`, config);
        console.log(data);
        const stringObj = JSON.stringify(data?.data?.groupList[0]?.groups);
        localStorage.setItem('groupList', stringObj)
        data?.data?.groupList[0]?.groups?.map(list => displayGroup(list));
    }
    else {
        list = JSON.parse(list)
        console.log(list);
        await list.map(ele => displayGroup(ele));
        let div = document.getElementsByClassName('side__lower-contact');
        console.log(div);
        for (let i = 0; i < div.length; i++) {
            div[i].addEventListener('click', () => {
                console.log(div[i]);
                const id = div[i].id;
                console.log(id);
                let groupId = id.match(/(\d+)/);
                console.log(groupId);
                currentGroupId=Number(groupId[0]);
                console.log(currentGroupId);
                getMessageById(groupId[0],1,div[i].innerHTML);
            });
        }
        
    }
}
async function displayGroup(list) {
    console.log(list);
    const groupList = document.getElementById('groupList');
    console.log(groupList);
    const div = document.createElement('div');
    div.className = `side__lower-contact`;
    div.id = `group${list?.id}`;
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      d="M206.7 378.1c10.23 7.832 24.32 7.832 34.55 0C282.6 346.3 384 259.6 384 173.6C384 65.83 312.3 0 224 0C135.6 0 64 65.83 64 173.6C64 259.6 165.4 346.3 206.7 378.1zM240 236c0-33.13 26.88-60 60-60h24c6.625 0 12 5.375 12 12v8C336 229.1 309.1 256 276 256h-24C245.4 256 240 250.6 240 244V236zM112 196v-8C112 181.4 117.4 176 124 176h24C181.1 176 208 202.9 208 236v8C208 250.6 202.6 256 196 256h-24C138.9 256 112 229.1 112 196zM319.7 352.5c-20.72 20.3-41.57 37.69-58.92 51.03C250.2 411.6 237.2 416 224 416s-26.23-4.43-36.78-12.51c-17.33-13.33-38.17-30.7-58.88-50.99C57.07 355.2 0 413.4 0 485.3C0 500.1 11.94 512 26.66 512H421.3C436.1 512 448 500.1 448 485.3C448 413.4 390.9 355.2 319.7 352.5z" />
  </svg>
  <div class="side__lower-contact-textbox">
    <div class="side__lower-contact-name">${list?.groupname}</div>
    <div class="side__lower-contact-text">Lorem ipsum dolor sit amet...</div>
  </div>`
    groupList.appendChild(div);
}


function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
const sendMessage = document.getElementById('sendMessage');
sendMessage.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputChat = document.getElementById('inputChat');
    console.log(inputChat.value);
    const message = {
        message: inputChat?.value,
        // groupId: JSON.parse(localStorage.getItem('groupList')).id,
        groupId:currentGroupId,
    }
    const messageList = document.getElementById('messageList');
    let id = 1;
    if (messageList.lastElementChild !== null)
        id = messageList.lastElementChild.id;
    await getMessageById(currentGroupId,id);
    const data = await axios.post(`${url}/message`, message, config);
    // let messages = [];
    // if (isMessage()) {
    //     messages = localStorage.getItem('messages');
    //     messages = JSON.parse(messages);
    // }
    // messages.push({ id: data?.data?.data?.id, name: "You", message: data?.data?.data?.message })
    displayMessage("You", data?.data?.data?.message, data?.data?.data?.id);
    inputChat.value = "";
    inputChat.focus()
})
function getAdmin(e){
    console.log(e.target.id);
    console.log(e.target.id);
    localStorage.setItem('groupAdminPage',e.target.id);
    location=`${url}/addAdmin.html`;
}