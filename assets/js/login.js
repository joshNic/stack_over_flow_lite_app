document.getElementById('login_user').addEventListener('submit', loginUser);
function loginUser(e){
    e.preventDefault();
    
    let user_email = document.getElementById('user_email').value;
    let user_password = document.getElementById('user_password').value;
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + window.btoa(user_email + ":" + user_password));
    fetch('https://stackoverflow-v2.herokuapp.com/api/v2/auth/login', {
        method: 'GET',
        headers: headers
    })
        .then((res) => {
            if(res.status == 200){
                let result = res.json();
                result
                    .then((data) => {
                        localStorage.setItem('token', data.token)
                        window.location = 'home.html'
                    })
            }
            else{
                let result = res.text();
                result
                    .then((data) => {
                        let message = `
                        <div class="alert">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            ${data} try again.
                        </div>`;
                        document.getElementById('message').innerHTML = message;
                        setTimeout(function () { document.location.reload(true); }, 2000);
                    })
            }
        })
        
        .catch((err) => console.log(err))

}