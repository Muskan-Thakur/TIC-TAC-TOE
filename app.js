//select elements from the html
let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn0=true; //player0 playerX  keep track of player
// Add these lines at the beginning of your script
let playerXWinCount = 0;
let playerOWinCount = 0;

//array containing all possible win patterns in the game
const winPatterns=
[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//function to reset the game

const resetGame=() =>
{
    turn0=true; 
    enableBoxes();
    msgContainer.classList.add("hide"); //hide msg container
}


//event listerers for each box to handle player moves
boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        console.log("box is clicked");
       if(turn0)
       {
        //player0
        box.innerText= "O"; //set text to "0"
        turn0 = false; //now switch to player X turn
       }
       else
       {
        //playerX
        box.innerText= "X"; //set box to text X
        turn0=true; //switch turn to player O
       }
       box.disabled=true; //disabled the clicked box to prevent further moves

       checkWinner();//check if the game is over or any one won after each move or not
    });
});

//function to disable all boxes
const disableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};

//function to enable all boxes
const enableBoxes =()=>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};

//function to display the winner message
const showWinner=(winner)=>
{
    msg.innerText=`Congratualtions,Winner is ${winner}`;
    msgContainer.classList.remove("hide");

  if (winner === "X") {
        playerXWinCount++; // Increment X's win count
    } else if (winner === "O") {
        playerOWinCount++; // Increment O's win count
    }
    updateWinCount(); // Update win count display
    disableBoxes();
};

//function to update win count display
const updateWinCount = () => {
    document.getElementById("playerXWinCount").innerText = playerXWinCount;
    document.getElementById("playerOWinCount").innerText = playerOWinCount;
};



//function to check for a draw
const checkDraw=()=>
{//check all boxes are filled
    for(let box of boxes)
    {
        if(box.innerText === "")
        {
            return false;//not draw
        }
      
    }
    return true;//all boxes filled, its draw
};

//function to check for a winner or draw
const checkWinner = ()=>{
   
for( let pattern of winPatterns)
{
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val !="")
    {  
        if(pos1Val === pos2Val && pos2Val === pos3Val)
        {
            console.log("winner",pos1Val);
            showWinner(pos1Val); //display winner message
            return;
        }
    }
}
if(checkDraw())
{
    showDrawMessage(); //display draw message
}

};
//function to display the draw messages
const showDrawMessage=()=>
{
    msg.innerText="It's a draw!"; //display draw message
    msgContainer.classList.remove("hide");//show messgae container
};




//event listerner for reset and new game buttons
newGameBtn.addEventListener("click",resetGame); //reset button
resetbtn.addEventListener("click",resetGame);  //new game button

       // Add event listener for exit button
       document.getElementById("exit-btn").addEventListener("click", function() {
        // Ask for confirmation before exiting
        if (confirm("Are you sure you want to exit?")) {
            // Close the window
            window.close();
        }
    });