
let questionId = getUrlQuestionId()["question_id"];
console.log(questionId);
function getUrlQuestionId() {
    let urlVars = {};
    let urlParts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        urlVars[key] = value;
    });
    return urlVars;
}

url = 'http://127.0.0.1:5000/api/v2/question/'+questionId;
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
                    <span><a href="#">Josh</a></span> <small>5 mins ago</small><small>Status: ${answers.answer_status}</small>
                    <hr>
                    `;
        });
        document.getElementById('answers').innerHTML = output;
    })