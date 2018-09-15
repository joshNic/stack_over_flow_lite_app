
document.getElementById('postQuestion').addEventListener('submit', postQuestion);

function postQuestion(e) {
    e.preventDefault();
    let questionTitle = document.getElementById('questionTitle').value;
    let questionBody = document.getElementById('questionBody').value;
    fetch('http://127.0.0.1:5000/api/v2/question', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ question_title: questionTitle, question_body: questionBody })
    })
        .then((res) => {
            const resp = res.json();
            if (res.status != 201) {
                console.log(res.status)
                resp
                    .then((data) => {
                        let message = `
                        <div class="alert">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            ${data.message} try again.
                        </div>`;
                        document.getElementById('message').innerHTML = message;
                    })

            }
            else {
                resp
                    .then((data) => {
                        let message = `
                        <div class="alert success">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            <strong>Yahh</strong> ${data.message}.
                        </div>`;
                        document.getElementById('message').innerHTML = message;
                    })
            }
        })

        .catch((error) => console.log(error))
}
