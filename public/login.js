const login=async ()=>{
    // e.preventDefault();
    const email = document.getElementById('email');
    // let temp=[]
    // temp=localStorage.getItem('chat');
    // temp.push()
    const password = document.getElementById('password');
    const obj={
        email:email.value,
        password:password.value
    }
    try {
        const result=await axios.post('http://localhost:3000/login',obj);
        console.log(result);
        alert(result?.data?.message)

        // check if user does not exist then delete localStorage memory and redirect it to same login page 
        if(result?.data?.status=== 404){
            // delete localStorage 
            localStorage.clear();
        location='http://localhost:3000/login.html'
        }
        else{ 
        localStorage.setItem('token',result?.data?.token)
        localStorage.setItem('userName',result?.data?.userName)
        location=`http://localhost:3000/index.html`
        }
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener('DOMContentLoaded',()=>{
    localStorage.clear();
})