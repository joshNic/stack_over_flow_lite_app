
fetch('http://127.0.0.1:5000/api/v2/questions')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h1>Recent Questions</h1>';
        data.forEach(function (question) {
            output += `
                    <hr>
                    <p><a href="viewquestion.html">${question.question_title}?</a></p>
                    <p>${question.question_body}</p>
                    <span><a href="#">Josh</a></span> <small>5 mins ago</small>
                    <hr>
                    `;
        });
        document.getElementById('all_questions').innerHTML = output;
    })