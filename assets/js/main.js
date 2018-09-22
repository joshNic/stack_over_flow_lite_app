
document.getElementById('register_user').addEventListener('submit', registerUser);

function registerUser(e) {
    e.preventDefault();
    let user_email = document.getElementById('user_email').value;
    let user_password = document.getElementById('user_password').value;
    fetch('https://stackoverflow-v2.herokuapp.com/api/v2/auth/signup', {
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
                        setTimeout(function () { document.location.reload(true); }, 2000);
                    })
            
            }
            else{
            resp
                .then((data) => {
                    let message = `
                        <div class="alert success">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            <strong>Yahh</strong> ${data.success} redirecting to login.
                        </div>`;
                    document.getElementById('message').innerHTML = message;
                    setTimeout(function () { window.location = 'ind.html'; }, 2000);
                })}
        })
        
        .catch((error) => console.log(error))
}
