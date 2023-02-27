import "./App.css";
import * as React from "react";
import {useState} from "react";
import Board from "./components/Board";

function App() {
  //checkers returns initial state
  const [checkers, setCheckers] = useState(initializeBoard())
  const [turn, setTurn] = useState(false) 

  
  function legalMove(){
    
  }

  function nonSelectedDeactivate(i, j){
    let color 
    if(turn) {
      color = "red"
    } else {
      color = "black"
    }

    for (let r=0; r < 8; r++){
      for(let c=0; c<8; c++) {
        const isCurrentActive = r === i && j === c;
        const isSameColorAsCurrentActive = checkers[r][c]["color"] === color;
        if (isSameColorAsCurrentActive && !isCurrentActive){
          checkers[r][c]["isActive"]=false
        } 
      }
    }
  }

  /*
  {
    color: 'red',
    isKing: false,
    isActive: false,
  }
  */

    /*
  Rule: 

  *Turn*
  Red => True   ;    Black => False

  a) click a piece, click another piece (on same side), everything goes blank except for the selected piece
  b) if legal: move is made, unselect all the yellow borders and move the piece to the valid spot 
  c) if illegal: do nothing
  d) if click yellow border actived: unactive the border
  e) only one selected piece at a time
  */
 
  function checkerClick(i, j) {
    // On the second click where you want to move it to...
    // Do you want to loop through current board and find previous
    // active object INDEX and also use curren i,j of current empty
    // cell... and them ove like that?
    // OR
    // Do you want to have useState of current Active.. and just use that.
    let previousRow;
    let previousColumn;
    
    for (let k = 0 ; k < 8 ; k++){
      for (let l = 0 ; l < 8 ; l++){
        if (checkers[k][l]["isActive"]){
          previousRow = k
          previousColumn = l
        }
      }
    }

    //next objective: move the piece into a legal place, 
  // after that set off a validation if the move was legal or not

    
    let tempArr = [...checkers]
    nonSelectedDeactivate(i, j)
    tempArr[i][j].isActive = !tempArr[i][j].isActive
    setCheckers(tempArr)
  }

  function initializeBoard() {
    const checkers = [];

    pushPieces("red", checkers);

    //empty spots
    for (let i = 3; i < 5; i++) {
      let innerArray = [];
      for (let j = 0; j < 8; j++) {
        innerArray.push(" ");
      }
      checkers.push(innerArray);
    }

    pushPieces("black", checkers);

    function pushPieces(color, checkers) {
      for (let i = 0; i < 3; i++) {
        let innerArray = [];
        for (let j = 0; j < 8; j++) {
          if ((i % 2 === 0 && color === "red") || (i % 2 === 1 && color === "black")){
            if (j % 2 === 1) {
              innerArray.push({
                color: color,
                isKing: false,
                isActive: false,
              });
            } else {
              innerArray.push("");
            }
          } else {
            if (j % 2 === 0) {
              innerArray.push({
                color: color,
                isKing: false,
                isActive: false,
              });
            } else {
              innerArray.push("");
            }
          }
        }
        checkers.push(innerArray);
      }
    }

    return checkers;
  }
  
  return (
    <main>
      <Board 
        checkers={checkers}
        checkerClick={checkerClick}
      />
    </main>
  );
}

export default App;
