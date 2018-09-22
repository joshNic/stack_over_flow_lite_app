
fetch('https://stackoverflow-v2.herokuapp.com/api/v2/questions')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h1>Recent Questions</h1>';
        data.forEach(function (question) {
            output += `
                    <hr>
                    <p><a href="viewquestion.html?question_id=${question.question_id}">${question.question_title}?</a></p>
                    <p>${question.question_body}</p>
                    <span><a href="#">By: ${question.question_author}</a></span> <small>On: ${question.question_date}</small>
                    <hr>
                    `;
        });
        document.getElementById('all_questions').innerHTML = output;
    })