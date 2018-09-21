
fetch('http://127.0.0.1:5000/api/v2/user/questions', {
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }})
    .then((res) => res.json())
    .then((data) => {
        let output = `
        <h4>${data.details[0].user}</h4>
        <p>Questions asked: ${data.details[0].count}</p>
        <p>Answers give: ${data.details[0].answers}</p>
        `;
        let outPut1 = '<h1>My Recent Questions</h1>';
        let outPut2 = '<h1>My Most Active Questions</h1>';
        data.message.forEach(function (question) {
            outPut1 += `
                    <hr>
                    <p><a href="viewquestion.html?question_id=${question.question_id}">${question.question_title}?</a></p>
                    <p>${question.question_body}</p>
                    <small>5 mins ago</small>
                    <hr>
                    <a href="editquestion.html?question_id=${question.question_id}"><input type="submit" name="submit" value="edit"></a>
                    <input type="submit" name="submit" value="delete" onclick="deleteQuestion(${question.question_id});">
                    `;
            outPut2 += `
                    <hr>
                    <p><a href="viewquestion.html?question_id=${question.question_id}">${question.question_title}?</a></p>
                    <p>${question.question_body}</p>
                    <small>${question.answer_count} answers</small>
                    <hr>
                    <a href="editquestion.html?question_id=${question.question_id}"><input type="submit" name="submit" value="edit"></a>
                    <input type="submit" name="submit" value="delete">
                    `;
        });
        document.getElementById('user').innerHTML = output;
        document.getElementById('question').innerHTML = outPut1;
        document.getElementById('activity').innerHTML = outPut2;
    })

    function deleteQuestion(id){
        let url = 'http://127.0.0.1:5000/api/v2/question/'+id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((res) => {
                const resp = res.json();
                if (res.status != 200) {
                    console.log(res.status)
                    resp
                        .then((data) => {
                            console.log(data.message);
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
                            console.log(data.message);
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