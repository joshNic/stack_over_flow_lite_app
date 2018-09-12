
document.getElementById('register_user').addEventListener('submit', registerUser);

function registerUser(e) {
    e.preventDefault();
    let user_email = document.getElementById('user_email').value;
    let user_password = document.getElementById('user_password').value;
    fetch('http://127.0.0.1:5000/api/v2/auth/signup', {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ user_email: user_email, user_password: user_password })
    })
        .then((res) => {
            const resp = res.json();
            if (res.status!=201){
                console.log(res.status)
                resp
                    .then((data) => {
                        let message =`
                        <div class="alert">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            ${data.error} try again.
                        </div>`; 
                        document.getElementById('message').innerHTML = message;
                    })
            
            }
            else{
            resp
                .then((data) => {
                    let message = `
                        <div class="alert success">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            <strong>Yahh</strong> ${data.success} go to login.
                        </div>`;
                    document.getElementById('message').innerHTML = message;
                })}
        })
        
        .catch((error) => console.log(error))
}
