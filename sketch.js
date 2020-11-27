//Lucy Harck
//
// used createA(), createButton(), and userInput createImg()

var game_state = "INTRO";
var canvas, button;
let buttonText = "i understand"; 
var buttons = [];
var checkOne, checkTwo,checkNeutral;
var currentQuestion = 1;
var dancing_brain;

//source: https://d3jc3ahdjad7x7.cloudfront.net/spokaLTFBEADL9JnMd7njgJd96nyp7YNgICG2tlJWifcI7GP.pdf
var questionsTable = {
  q1 : {question : "At a party do you: ",  a : "Interact with many, including strangers", b : "Interact with a few, known to you"},
  q2 : {question : "Are you more: ",  a : "Realistic than speculative", b : "Speculative than realistic"},
  q3 : {question : "Is it worse to: ",  a : "Have your “head in the clouds” ", b : "Be “in a rut”"},
  q4 : {question : "Are you more impressed by: ",  a : "Principles ", b : "Emotions"},
  q5 : {question : "Are more drawn toward the: ",  a : "Convincing", b : "Touching"},
  q6 : {question : "Do you prefer to work: ",  a : "To deadlines ", b : "Just “whenever” "},
  q7 : {question : "Do you tend to choose: ",  a : "Rather carefully ", b : "Somewhat impulsively "},
  q8 : {question : "At parties do you: ",  a : "Stay late, with increasing energy ", b : "Leave early with decreased energy"},
  q9 : {question : "Are you more attracted to: ",  a : "Sensible people ", b : "Imaginative people "},
  q10 : {question : "Are you more interested in: ",  a : "What is actual", b : "What is possible"},
  q11 : {question : "In judging others are you more swayed ",  a : "Laws than circumstances", b : "Circumstances than laws"},
  q12 : {question : "In approaching others is your inclination to be somewhat: ",  a : "Objective", b : "Personal"},
  q13 : {question : "Are you more: ",  a : "Punctual", b : "Leisurely"},
  q14 : {question : "Does it bother you more having things: ",  a : "Incomplete", b : "Completed"},
  q15 : {question : "In your social groups do you: ",  a : "Keep abreast of other's happenings", b : "Get behind on the news"},
  q16 : {question : "In doing ordinary things are you more likely to: ",  a : "Do it the usual way", b : "Do it your own way"},
  q17 : {question : "Writers should: ",  a : "Say what they mean and mean what they say", b : "Express things more useful of analogy"},
  q18 : {question : "Which appeals to you more: ",  a : "Consistency of thought", b : "Harmonious human relationships"},
  q19 : {question : "Are you more comfortable in making: ",  a : "Logical judgments", b : "Value judgments"},
  q20 : {question : "Do you want things: ",  a : "Settled and decided", b : "Unsettled and undecided"},
  q21 : {question : "Would you say you are more: ",  a : "Serious and determined", b : "Unsettled and undecided"},
  q22 : {question : "In phoning do you:",  a : "Rarely question what you'll say", b : "Rehearse what you'll say"},
  q23 : {question : "Facts:",  a : "Speak for themselves", b : "Illustrate principles"},
  q24 : {question : "Are visionaries: ",  a : "Annoying", b : "Facinating"},
  q25 : {question : "Are you more often:",  a : "cool-headed", b : "warm-hearted"},
  q26 : {question : "Is it worse to be: ",  a : "unjust", b : "merciless"},
  q27 : {question : "Should one usually let events occur:  ",  a : "by careful selection and choice", b : "randomly and by chance"},
  q28 : {question : "Do you feel better about: ",  a : "having purchased", b : "having the option to buy"},
  q29 : {question : "In company do you: ",  a : "initiate conversation", b : "wait to be approached"},
  q30 : {question : "Common sense is: ",  a : "rarely questionable", b : "frequently questionable"},
  q31 : {question : "Children often do not:",  a : "make themselves useful enough", b : "exercise their fantasy enough"},
  q32 : {question : "In making decisions do you feel more comfortable with: ",  a : "standards", b : "feelings"},
  q33 : {question : "Are you more: ",  a : "firm than gentle", b : "gentle than firm"},
  q34 : {question : "Which is more admirable: ",  a : "the ability to organize", b : "ability to adapt"},
  q35 : {question : "Do you put more value on: ",  a : "infinite", b : "open-minded"},
  q36 : {question : " Does new and non-routine interaction with others: ",  a : "stimulate and energize you", b : "tax your reserves"},
  q37 : {question : "Are you more frequently:",  a : "a practical person", b : "daydreamer"},
  q38 : {question : "Are you more likely to: ",  a : "see how others are useful", b : "see how others see"},
  q39 : {question : "Which is more satisfying: ",  a : "to discuss an issue thoroughly", b : "to arrive at agreement on an issue"},
  q40 : {question : "Which rules you more: ",  a : "your head", b : "your heart"},
  q41 : {question : "Are you more comfortable with work that is: ",  a : "contracted", b : "done on a casual basis"},
  q42 : {question : "Do you tend to look for: ",  a : "the orderly", b : "whatever turns up"},
  q43 : {question : "Do you prefer: ",  a : "many friends with breif contact", b : "a few friends with more length contacgt"},
  q44 : {question : "Do you go more by: ",  a : "fact", b : "principles"},
  q45 : {question : "Are you more interested in: ",  a : "productoin and distribution", b : "design and research"},
  q46 : {question : "Which is more of a compliment:",  a : "You're a very logical person", b : "Youre a very caring person"},
  q47 : {question : "Do you value in yourself more that you are: ",  a : "Unwavering", b : "Devoted"},
  q48 : {question : "Do you more often prefer the: ",  a : "Final and unalterable", b : "Tentative and preliminary statement"},
  q49 : {question : "Are you more comfortable: ",  a : "After a decision", b : "Before a decision"},
  q50 : {question : "Do you: ",  a : "Speak easily and at length with strangers", b : "Find little to say to strangers"},
  q51 : {question : "Are you more likely to trust your: ",  a : "Experience", b : "Hunch"},
  q52 : {question : "Do you feel: ",  a : "More practical than ingenious", b : "More ingenious than practical"},
  q53 : {question : "Which person is more to be complimented – one of: ",  a : "Clear reason", b : "Strong feeling"},
  q54 : {question : "Are you inclined more to be: ",  a : "fair-minded", b : "sympathetic"},
  q55 : {question : "Is it preferable mostly to: ",  a : "make sure things are arranged ", b : "just let things happen"},
  q56 : {question : "In relationships should most things be: ",  a : "re-negotiable", b : "random and circumstantial"},
  q57 : {question : "When the phone rings do you:  ",  a : "hasten to get to it first", b : "hope someone else will answer"},
  q58 : {question : "Do you prize more in yourself:",  a : "a strong sense of reality", b : "a vivid imagination"},
  q59 : {question : "Are you drawn more to: ",  a : "fundamentals", b : "overtones"},
  q60 : {question : "Which seems the greater error: ",  a : "to be too passionate", b : "to be too objective"},
  q61 : {question : "Do you see yourself as basically: ",  a : "hard-hearted", b : "soft-hearted"},
  q62 : {question : "Which situation appeals to you more: ",  a : "scheduled", b : "unscheduled"},
  q63 : {question : "Are you a person that is more: ",  a : "routined", b : "whimsical and random"},
  q64 : {question : "Are you more inclined to be: ",  a : "approachable", b : "reserved"},
  q65 : {question : "In writings do you prefer: ",  a : "literal", b : "figurative"},
  q66: {question : "Is it harder for you to: ",  a : "identify with others", b : "utillize others"},
  q67 : {question : "Is it harder for you to: ",  a : "clarity of reason", b : "strength of compassion"},
  q68 : {question : "Which is the greater fault: ",  a : "being indiscriminate", b : "being critical"},
  q69: {question : "Do you prefer the: ",  a : "planned event", b : "unplanned event"},
  q70 : {question : "Do you tend to be more: ",  a : "deliberate", b : "spontanious"},
}

//table to keep track of the participant's score
var scoringTable = {
  Col1 : { A: 0, B: 0},
  Col2 : { A: 0, B: 0},
  Col3 : { A: 0, B: 0},
  Col4 : { A: 0, B: 0},
  Col5 : { A: 0, B: 0},
  Col6 : { A: 0, B: 0},
  Col7 : { A: 0, B: 0}
};


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');

  createObjects()
  textAlign(CENTER);
  fill(255, 0, 0);

}

function draw() {
  background(0,120,255);
  if(game_state == "INTRO")
    drawIntro();
  else if(game_state == "START_QUESTIONS")
    drawQuestions();
}

function createObjects(){
  dancing_brain = createImg('https://media.giphy.com/media/Zbw8VxOJ6bgKQ/giphy.gif');

  button = createButton(buttonText);
  button.mousePressed(buttonClicked)

  //create quiz buttons
  checkOne = createButton("a");
  checkOne.mousePressed(checkedOne);

  checkTwo = createButton("b");
  checkTwo.mousePressed(checkedTwo);

  //haha, 'pushed my buttons - get it??' -- cheesy.
  buttons.push(checkOne);
  buttons.push(checkTwo);

  for(var i = 0; i < buttons.length; i++){
    buttons[i].hide()
    buttons[i].style('background-color', 'white')
  }

  resizeObjects();
}

function buttonClicked(){
  if(game_state == "INTRO"){
    game_state = "START_QUESTIONS"
    button.hide();
  }
}

function resizeObjects(){
  //button styling
  button.position(windowWidth/2.5, windowHeight/2)
  button.size(windowWidth/5, windowHeight/15)
  button.style('background-color', 'white')
  button.style('border-radius', windowWidth/10+'px')
  button.style('font-size', windowWidth/50+'px')
  button.style('border', 'none')
  //-------------------------------------
  dancing_brain.size(200,150)
  dancing_brain.position(windowWidth- 225, windowHeight - 200)
  //-------------------------------------
  var shiftY = 0;
  for(var i = 0; i < buttons.length; i++){
    buttons[i].position((windowWidth/2)- 175 , (windowHeight/2) + shiftY)
    buttons[i].size(350,50)
    buttons[i].style('border-radius', windowWidth/20+'px')
    buttons[i].style('background-color', 'white')
    buttons[i].style('border', 'none')
    buttons[i].style('outline', '0')
    shiftY += 75;

  } 
}

function checkedOne(){
  currentQuestion++;
  drawQuestions();
  addToScore("A");
}
function checkedTwo(){
  currentQuestion++;
  drawQuestions();
  addToScore("B");
}

function addToScore(letter){
  if(currentQuestion == 1 || currentQuestion == 8 || currentQuestion == 15 || currentQuestion == 22 || currentQuestion == 29 || currentQuestion == 36 || currentQuestion == 43 || currentQuestion == 50|| currentQuestion == 57|| currentQuestion == 64 ){
    scoringTable.Col1[letter]++;
  }
  else if(currentQuestion == 2 || currentQuestion == 9 || currentQuestion == 16 || currentQuestion ==  23 || currentQuestion == 30 || currentQuestion == 37|| currentQuestion == 44|| currentQuestion == 51|| currentQuestion == 58|| currentQuestion == 65){
    scoringTable.Col2[letter]++;
  }
  else if(currentQuestion == 3 || currentQuestion == 10 || currentQuestion == 17 || currentQuestion == 24 || currentQuestion == 31 || currentQuestion == 38 || currentQuestion == 45 || currentQuestion == 52 || currentQuestion == 59 || currentQuestion == 66){
    scoringTable.Col3[letter]++;
  }
  else if(currentQuestion == 4 || currentQuestion == 11 || currentQuestion == 18|| currentQuestion == 25|| currentQuestion == 32|| currentQuestion == 39|| currentQuestion == 46|| currentQuestion == 53|| currentQuestion == 60|| currentQuestion == 67){
    scoringTable.Col4[letter]++;
  }
  else if(currentQuestion == 5  || currentQuestion == 12  || currentQuestion == 19 || currentQuestion == 26 || currentQuestion == 33 || currentQuestion == 40 || currentQuestion == 47 || currentQuestion == 54 || currentQuestion == 61 || currentQuestion == 68){
    scoringTable.Col5[letter]++;
  }
  else if(currentQuestion == 6  || currentQuestion == 13 || currentQuestion == 20 || currentQuestion == 27 || currentQuestion == 34 || currentQuestion == 41 || currentQuestion == 48 || currentQuestion == 55 || currentQuestion == 62 || currentQuestion == 69){
    scoringTable.Col6[letter]++;
  }
  else if(currentQuestion == 7 || currentQuestion == 14 || currentQuestion == 21 || currentQuestion == 28 || currentQuestion == 35 || currentQuestion == 42 || currentQuestion == 49 || currentQuestion == 56 || currentQuestion == 63 || currentQuestion == 70){
    scoringTable.Col7[letter]++;
  }
}


function drawIntro(){
  noStroke();
  textSize(windowHeight/10);
  text('myers briggs personality test', windowWidth/2, windowHeight/4);

  textSize(windowHeight/25);
  text('Test created by Katharine Cook Briggs and Isabel Briggs Myers.\nThe results of this quiz are not binary. Personalities shift, and people change. \nConsider this test as a blueprint to your personality right now as it is not set in stone. ', windowWidth/2, windowHeight/3);
  fill(255);

  stroke(0,0,0);
  line(windowWidth/5, windowHeight/3.5, windowWidth/1.25, windowHeight/3.5);
  strokeWeight(3);
}

function drawQuestions(){
  var questionText;
  if(currentQuestion <= 70){
    noStroke()
    textSize(windowHeight/15);
    questionText = text(("Question #" + currentQuestion + "\n" + questionsTable['q'+currentQuestion].question), windowWidth/2, windowHeight/3);
    fill(255);
    buttons[0].elt.firstChild.data = questionsTable['q'+currentQuestion].a.toLowerCase()
    buttons[1].elt.firstChild.data = questionsTable['q'+currentQuestion].b.toLowerCase()

    for(var i = 0; i < buttons.length; i++){
      buttons[i].show()
    }
  }
  else{
    for(var i = 0; i < buttons.length; i++){
      buttons[i].hide()
    }
    
    calculateResults()
  }
}

function calculateResults(){
  var type = "";

  if(scoringTable.Col1.A >= scoringTable.Col1.B)
    type += "E"
  else if(scoringTable.Col1.A <= scoringTable.Col1.B)
    type += "I"

  if(scoringTable.Col2.A + scoringTable.Col3.A  >= scoringTable.Col2.B + scoringTable.Col3.B)
    type += "S"
  else if(scoringTable.Col2.A + scoringTable.Col3.A  <= scoringTable.Col2.B + scoringTable.Col3.B)
    type += "N"

  if(scoringTable.Col4.A + scoringTable.Col5.A  >= scoringTable.Col4.B + scoringTable.Col5.B)
    type += "T"
  else if(scoringTable.Col4.A + scoringTable.Col5.A  <= scoringTable.Col4.B + scoringTable.Col5.B)
    type += "F"

  if(scoringTable.Col6.A + scoringTable.Col7.A  >= scoringTable.Col6.B + scoringTable.Col7.B)
    type+="J"
  else if(scoringTable.Col6.A + scoringTable.Col7.A  <= scoringTable.Col6.B + scoringTable.Col7.B)
    type += "P"

  showResults(type)
}

function showResults(type){
  link = createA("https://www.16personalities.com/" + type + "-personality/", "Congrats, you're an " + type  + "!\n" + " \n Click hear to learn about your personality");
  link.style('font-size', windowWidth/30 + 'px')
  link.style('color', 'white')
  link.style('text-decoration', 'none')
  link.position(50, windowHeight/2)


  game_state = "FINISHED"
}

function windowResized(){
  canvas = createCanvas(windowWidth, windowHeight);
  resizeObjects();
}

