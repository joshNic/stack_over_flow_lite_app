document.getElementById('login_user').addEventListener('submit', loginUser);
function loginUser(e){
    e.preventDefault();
    
    let user_email = document.getElementById('user_email').value;
    let user_password = document.getElementById('user_password').value;
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + window.btoa(user_email + ":" + user_password));
    fetch('http://127.0.0.1:5000/api/v2/auth/login', {
        method: 'GET',
        headers: headers
    })
        .then((res) => {
            if(res.status == 200){
                let result = res.json();
                result
                    .then((data) => console.log(data));
            }
            else{
                let result = res.text();
                result
                    .then((data) => console.log(data));
            }
        })
        
        .catch((err) => console.log(err))

}