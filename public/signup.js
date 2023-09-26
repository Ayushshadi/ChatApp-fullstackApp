const url='http://localhost:3000'
const save=async ()=>{
    // e.preventDefault();
    const name = document.getElementById('name');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let temp=[];
    // temp=localStorage.getItem('chat');
    // temp.push(`${name}`);

    const obj={
        name:name.value,
        phone:phoneNumber.value,
        email:email.value,
        password:password.value
    }
    try {
        const result=await axios.post(`http://localhost:3000/signup`,obj);
        console.log(result);
        alert(result?.data?.message)
        location=`http://localhost:3000/login.html`
    } catch (error) {
        console.log(error);
    }
}