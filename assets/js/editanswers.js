let questionId = getUrlQuestionId()["question_id"];
let answerId = getUrlQuestionId()["answer_id"];
console.log(questionId);
function getUrlQuestionId() {
    let urlVars = {};
    let urlParts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        urlVars[key] = value;
    });
    return urlVars;
}
url = 'https://stackoverflow-v2.herokuapp.com/api/v2/answer/' + answerId;
url2 = 'https://stackoverflow-v2.herokuapp.com/api/v2/question/'+questionId+'/answer/'+answerId;
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let edit = `
        <label for="qbody"><b>Update Your Answer</b></label>
                <textarea rows="4" cols="50" id="answerBody">
                    ${data[0].answer_body}
                </textarea>
                <div class="clearfix">
                        <button type="submit" class="signupbtn">Update Answer</button>
                </div>
        `;
        document.getElementById('editanswer').innerHTML = edit;
    })


document.getElementById('editanswer').addEventListener('submit', editAnswer);

function editAnswer(e) {
    e.preventDefault();
    let answerBody = document.getElementById('answerBody').value;
    fetch(url2, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({answer_body: answerBody })
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
                        setTimeout(function () { document.location.reload(true); }, 2000);
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
                        setTimeout(function () { window.location = 'profile.html'; }, 2000);
                    })
            }
        })

        .catch((error) => console.log(error))
}
