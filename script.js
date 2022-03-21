correct = new Audio('files/sounds/juntos-607.mp3');
questions = []
max = 0
score = 0
correct_answer = ''
correct_answer_label = '';
selected_answer = -1
    //import questions from questions.json file and format to json
async function getData() {
    questions = []
    score = 0
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
        x2 = "answer" + x;
        document.getElementById(x2).innerText = text;
    }
}

//unchecks all radios
function uncheck() {
    for (x = 1; x <= 4; x++) {
        x2 = "ans" + x;
        document.getElementById(x2).checked = false;
    }
}

//diables or enables clicking answers
function radioDisabled(state) {
    for (x = 1; x <= 4; x++) {
        x2 = "ans" + x;
        x3 = "answer" + x;
        document.getElementById(x2).disabled = state;
        // !! probably better way to do this, update in future
        if (state) {
            document.getElementById(x3).attributes.onClick.value = ""
        } else {
            document.getElementById(x3).attributes.onClick.value = "selectAnswer(this.id)"
        }
    }
}

//selects active answer
function selectAnswer(id) {
    selected_answer = id
    document.getElementById(id).style = "background-color: rgb(221, 221, 221, 0.6);border-radius: 5px;padding: 8px;";
    for (x = 1; x <= 4; x++) {
        x2 = "answer" + x;

        if (id != x2) {
            document.getElementById(x2).style = " ";
        }
    }
}

//clears selected answer
function clearSelected() {
    selected_answer = -1;

    for (x = 1; x <= 4; x++) {
        x2 = "answer" + x;
        document.getElementById(x2).style = " ";
    }
}

//loads random question onto screen and puts answers in random order
function loadQuestion() {
    //unchecks seleted radios
    uncheck();

    //makes radios clickable
    radioDisabled(false);

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

            //picks random position from those avaliable in answer_order
            rand = Math.floor(Math.random() * answer_order.length);

            //puts answer in text box
            document.getElementById(x).innerText = questions_data[index][answer_order[rand]];

            //saves the position of the correct answer
            if (answer_order[rand] == "tans") {
                correct_answer = "ans" + (r + 1);
                correct_answer_label = "answer" + (r + 1);
            }

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

function markQuestion() {
    if (document.getElementById(correct_answer).checked == true) {
        //plays ding sound
        correct.play();
        //makes answer green
        console.log(correct_answer_label);
        document.getElementById(correct_answer_label).style = "background-color: rgb(145, 238, 145);border-radius: 5px;padding: 8px;";
        //adds to score
        score++
        //diable answers
        radioDisabled(true);
    } else {
        //makes answer green if correct
        selected = document.querySelector('input[name="answer"]:checked').labels[0].id;
        document.getElementById(selected).style = "background-color: rgb(255, 107, 107);border-radius: 5px;padding: 8px;";
    }
}

function endOfQuiz() {
    document.getElementById("current_question").innerText = 'out of questions';
    alert(score);
    setAllAnswers();
    clearSelected();
}