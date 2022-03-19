async function getData() {
    response1 = await fetch('https://sam12604.github.io/drivingtheorywebsite/questions.json');
    questions_data = await response1.json();
    loadQuestion()
}

function loadQuestion() {
    let i = Math.floor((Math.random() * questions_data.length) + 1) - 1;
    console.log(i);

    document.getElementById("current_question").innerText = questions_data[i].question;
    document.getElementById("answer1").innerText = questions_data[i].tans;
    document.getElementById("answer2").innerText = questions_data[i].ans1;
    document.getElementById("answer3").innerText = questions_data[i].ans2;
    document.getElementById("answer4").innerText = questions_data[i].ans3;

    if (questions_data[i].diagram == true) {
        document.getElementById("diagram_img").src = "files/images/" + questions_data[i].ref + ".jpg";
        document.getElementById("diagram_img").style.display = "block";
    } else {
        document.getElementById("diagram_img").src = "";
        document.getElementById("diagram_img").style.display = "none";
    }
}

getData();