//define variables
let playing = false;
let score;
let correctAnswer;

//script upon click start/reset
document.getElementById("startreset").onclick = ()=> {
    if(playing){
        console.log("ending game");
        location.reload();
    }else{
        console.log("starting new game");
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show('timeremaining');  //I'm not sure I completely understand this line
        timeremaining = 10;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        document.getElementById('startreset').innerHTML = "Reset Game";
        playing = true;
        hide('gameover');

        startCountdown();

        generateQA();
    }
}


//clicking on an answer choice
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = ()=> {
        console.log("answer clicked");
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                //setTimeout( ()=> {hide("correct");}, 2000 ); //might be source of bug
                // setTimeout( hide("correct"), 1000);  //would this also work?
                setTimeout( function(){
                    hide("correct");
                }, 1000);
                generateQA();
            }else{
                hide("correct");
                show("wrong");
                setTimeout( ()=> {hide("wrong");}, 1000);
            }
        }
    }
}

//FUNCTION DEFINITIONS:
//start counter
const startCountdown = ()=> {
    action = setInterval( ()=> {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == -1){
            stopCountdown();
        }
    }, 1000);
}

//stop counter
const stopCountdown = ()=> {
    clearInterval(action);
    show("gameover");
    document.getElementById("gameover").innerHTML = "<p>game over..!</p><p>your score is " + score + "</p>";
    hide("timeremaining");
    hide("correct");
    hide("wrong");
    playing = false;
    document.getElementById("startreset").innerHTML = "Start Game";
}

//hide element by id
const hide = (id)=> {
    document.getElementById(id).style.display = "none";
}
//show element by id
const show = (id)=> {
    document.getElementById(id).style.display = "block";
}





//random number generator
const randNum = (n)=> {
    return Math.floor(Math.random()*n + 1);
}

//generate question and answers
const generateQA = ()=> {
    const operations = ['+', '-', 'x', '/', '^', 'root of'];

    // let x = Math.floor(Math.random()*10 + 1); //note: this might need adjustment
    // let y = Math.floor(Math.random()*10 + 1); //note: this might need adjustment
    let x = randNum(10);
    let y = randNum(10);
    let rand = Math.floor(Math.random()*6); //note: this too might need adjustment
    console.log("OPERATION: " + rand + "\nAFTER: x= " + x + ", and y=" + y);              

    let correctAnswer;
    switch(rand){
        case 0: 
            correctAnswer = x + y;
            break;
        case 1: 
            correctAnswer = x - y;
            break;
        case 2: 
            correctAnswer = x * y;
            break;
        case 3: 
            correctAnswer = x/y;
            break;
        case 4: 
            correctAnswer = x ** y;
            break;
        case 5: 
            correctAnswer = x ** (1/y);
            break;
    }

    //round correct answer to 2 decimal places
    correctAnswer = correctAnswer.toFixed(2);

    // console.log("OPERATION: " + rand + "\ncorrect Answer: " + correctAnswer + "\nAFTER: x= " + x + ", and y=" + y);
   


    //post question to the question div
    document.getElementById("question").innerHTML = (rand == 5 ? `${y} ${operations[rand]} ${x}` : `${x} ${operations[rand]} ${y}`);    //might need adjustment

    //generate a 'index position' for the correct answer in the answers array
    let correctPosition = Math.floor(Math.random()*3 + 1);    //might need adjustment
    console.log("correct position: " + correctPosition);

    //place answer in random answer box
    document.getElementById('box'+correctPosition).innerHTML = correctAnswer;

    //generate array of possible answers (including actual answer)
    let answers = [correctAnswer];      //QUESTION: why is it necessary to include correct answer in array

    //generate wrong answers
    for(i=1; i<5; i++){
        if(i != correctPosition){
            let wrongAnswer;
            x = randNum(10);
            y = randNum(10);
            do{
                console.log("OPERATION for wrong answer: " + rand + ", x=" + x + ", and y=" + y);
                switch(rand){
                    case 0: 
                        wrongAnswer = x + y;
                        console.log('addition' + x + "+" + y);
                        break;
                    case 1: 
                        wrongAnswer = x - y;
                        console.log('subtraction' + x + "-" + y);
                        break;
                    case 2: 
                        wrongAnswer = x * y;
                        console.log('multiplication' + x + "x" + y);
                        break;
                    case 3: 
                        wrongAnswer = x / y;
                        console.log('division' + x + "/" + y);
                        break;
                    case 4: 
                        wrongAnswer = x ** y;
                        console.log('exponential' + x + "^" + y);
                        break;
                    case 5: 
                        wrongAnswer = x ** 1/y;
                        console.log('root' + x + " root of " + y);
                        break;
                }
            }while(answers.indexOf(wrongAnswer) > -1);   //check that all answers are unique

            console.log(wrongAnswer);
            wrongAnswer = wrongAnswer.toFixed(2);

            console.log(wrongAnswer);
            document.getElementById("box"+i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer);
        }
    }

    


}