questions = []
max = 0
selected_answer = -1
    //import questions from questions.json file and format to json
async function getData() {
    questions = []
    response1 = await fetch('https://SimplyDrivingTheory.co/questions.json');
    questions_data = await response1.json();
    for (question = 0; question < questions_data.length; question++) {
        //loads relevent questions, currently all of them but may change if I implement topic picking
        questions.push(questions_data[question].ref);
    }
    max = questions.length;
    document.getElementById("progressbar").max = max;
    loadQuestion();
}

//easily set all answer boxes to one value
function setAllAnswers(text) {
    for (x = 1; x <= 4; x++) {
        x2 = "answer" + x
        document.getElementById(x2).innerText = text
    }
}

//selects active answer
function selectAnswer(id) {
    selected_answer = id
    document.getElementById(id).style = "background-color: rgb(221, 221, 221, 0.6);border-radius: 5px;padding: 8px;"
        /* rgb(145, 238, 145) green colour code for correct answer */
    for (x = 1; x <= 4; x++) {
        x2 = "answer" + x

        if (id != x2) {
            document.getElementById(x2).style = " "
        }
    }
}

//clears selected answer
function clearSelected() {
    selected_answer = -1

    for (x = 1; x <= 4; x++) {
        x2 = "answer" + x
        document.getElementById(x2).style = " "
    }
}

//loads random question onto screen and puts answers in random order
function loadQuestion() {
    //makes sure there is questions avaliable
    if (questions.length > 0) {
        //random number from length of avaliable questions
        i = Math.floor((Math.random() * questions.length) + 1) - 1;

        //finds the index for the question reference from the list of questions
        for (item = 0; item < questions_data.length; item++) {
            if (questions_data[item].ref == questions[i]) {
                index = item;
            }
        }

        //updates progressbar
        document.getElementById("progressbar").value = (max + 1) - questions.length;

        //displays the answers on the screen in a random order
        answer_order = ['tans', 'ans1', 'ans2', 'ans3'];
        for (let r = 0; r < 4; r++) {
            x = "answer" + String(r + 1);

            rand = Math.floor(Math.random() * answer_order.length);
            document.getElementById(x).innerText = questions_data[index][answer_order[rand]];
            answer_order.splice(rand, 1);
        }

        //displays the actual question on the screen
        document.getElementById("current_question").innerText = questions_data[index].question;

        //displays the image if one is required
        if (questions_data[index].diagram == true) {
            document.getElementById("diagram_img").src = "files/images/" + questions_data[index].ref + ".jpg";
            document.getElementById("diagram_img").style.display = "block";
        } else {
            document.getElementById("diagram_img").src = "";
            document.getElementById("diagram_img").style.display = "none";
        }

        //removes the completed question from the list of avaliable questions
        questions.splice(questions.indexOf(questions_data[index].ref), 1);

        //clears selected answers
        clearSelected();
    } else {
        //moves to end of quiz screen which will eventually display score
        endOfQuiz();
    }
}

function endOfQuiz() {
    document.getElementById("current_question").innerText = 'out of questions';
    setAllAnswers()
}