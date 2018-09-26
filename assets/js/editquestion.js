let questionId = getUrlQuestionId()["question_id"];
console.log(questionId);
function getUrlQuestionId() {
    let urlVars = {};
    let urlParts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        urlVars[key] = value;
    });
    return urlVars;
}
url = 'https://stackoverflow-v2.herokuapp.com/api/v2/question/' + questionId;
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let edit = `
        <label for="question"><b>Title</b></label>
                <input type="text" name="question" id="questionTitle" value="${data[0].question_title}?">
                <label for="qbody"><b>Question Description</b></label>
                <textarea rows="4" cols="50" id="questionBody">
                    ${data[0].question_body}
                </textarea>
                <div class="clearfix">
                    <button type="submit" class="signupbtn">Update Question</button></a>
                </div>
        `;
        document.getElementById('edit').innerHTML = edit;
    })


document.getElementById('edit').addEventListener('submit', editQuestion);

function editQuestion(e) {
    e.preventDefault();
    let questionTitle = document.getElementById('questionTitle').value;
    let questionBody = document.getElementById('questionBody').value;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ question_title: questionTitle, question_body: questionBody })
    })
        .then((res) => {
            const resp = res.json();
            if (res.status != 200) {
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
