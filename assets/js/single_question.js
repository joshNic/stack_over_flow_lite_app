
let questionId = getUrlQuestionId()["question_id"];
console.log(questionId);
function getUrlQuestionId() {
    let urlVars = {};
    let urlParts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        urlVars[key] = value;
    });
    return urlVars;
}

url = 'https://stackoverflow-v2.herokuapp.com/api/v2/question/'+questionId;
answerUrl = 'https://stackoverflow-v2.herokuapp.com/api/v2/question/'+questionId+'/answer';
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let output = `<h1>question</h1>
                    <p>${data[0].question_title}?</p>
                    <p>${data[0].question_body}?</p>
                    <h1>Answers</h1>`;
        data[0].answers.forEach(function (answer) {
            output += `
                    <hr>
                    <p>${answer.answer_body}</p>
                    <span><a href="#">By: ${answer.answer_author}</a></span> <small>On:  ${answer.answer_date}</small><small> Accepted: ${answer.answer_status}</small>
                    <a href="editanswer.html?answer_id=${answer.answer_id}&question_id=${questionId}"><input type="submit" name="submit" value="edit"></a>
                    `;
        });
        document.getElementById('answers').innerHTML = output;
    })

document.getElementById('postAnswer').addEventListener('submit', postAnswer);

function postAnswer(e) {
    e.preventDefault();
    let answerBody = document.getElementById('answerBoby').value;
    fetch(answerUrl, {
        method: 'POST',
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
                        setTimeout(function () { document.location.reload(true); }, 2000);
                    })
            }
        })

        .catch((error) => console.log(error))
}

