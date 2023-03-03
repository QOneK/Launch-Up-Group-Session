import "./App.css";
import * as React from "react";
import { useState } from "react";
import Board from "./components/Board";

function App() {
  //checkers returns initial state
  const [checkers, setCheckers] = useState(initializeBoard());
  const [turn, setTurn] = useState('black');

  /*
  {
    color: 'red',
    isKing: false,
    isActive: false,
  }
  */

  function isIllegalMove(i, j, previousColumn, previousRow) {
    const isFirstActiveClick = previousRow === undefined && previousColumn === undefined;
    if(isFirstActiveClick) {
      return false
    }
   // 1.1 - White Space
    const isBothEven = i % 2 === 0 && j % 2 === 0;
    const isBothOdd = i % 2 !== 0 && j % 2 !== 0;
    const isIllegalWhite = isBothEven || isBothOdd;
    if(isIllegalWhite){
      return true
    }
    //1.2 - can't move to a space with pieces already
    const hasAPiece = checkers[i][j] !== "";
    const isOppPiece = checkers[i][j]["color"] !== turn;
    if(hasAPiece && isOppPiece){
      return true
    }


    // 1.3 - Move pieces backwards
    // (if king then valid, if NOT king then not valid)

    //'checkers' is accessible and works here
    //if black, then value of i cannnot be higher
    //if red, then value of i cannot be lower

    function hasDiagonalPieces(previousRow, previousColumn, i, j) {
      let corners = [];
      if (checkers[previousRow - 1][previousColumn - 1] !== "") {
        corners.push("TL");
      } else if (checkers[previousRow - 1][previousColumn + 1] !== "") {
        corners.push("TR");
      } else if (checkers[previousRow + 1][previousColumn - 1] !== "") {
        corners.push("BL");
      } else if (checkers[previousRow + 1][previousColumn + 1] !== "") {
        corners.push("BR");
      }
      return corners;
    }

    // if (checkers[previousRow][previousColumn]["isKing"] === false) {
    //   // 2 more additional illegal moves
    //   // cannot move greater than 2 spaces if there is no opposition piece directly diagonal
    //   // cannot move greater more than 1 space if there is no opposition piece directly diagonal
    //   if (color === "red") {
    //     if (i <= previousRow) {
    //       // if BL or BR is true, moving 1 space or 3 spaces is illegal
    //       hasDiagonalPieces(previousRow, previousColumn, i, j)
    //       console.log('WASUPP:', hasDiagonalPieces)
    //       const hasBR= hasDiagonalPieces.indexOf("BR")
    //       const hasBL= hasDiagonalPieces.indexOf("BL")
    //       if (hasBR !== -1 || hasBL !== -1) {
            
    //         if (i ===1 || i>=3){
    //           return true;
    //         }
    //       }
    //     }
    //     // else if (
    //     //   // so if BR or BL is true - unlock 2 row move
    //     // ){
    //     //   // now that I have the corners - illegal move would be to move >3 and <1
    //     // }
    //   } else if (color === "black") {
    //     if (i >= previousRow) {
    //       return true;
    //     }
    //   }
    // } else if (checkers[previousRow][previousColumn]["isKing"] === true) {
    //   //we can do this later
    // }

    return false;
  }

  function checkerClick(i, j) {
    let tempArr = [];
    for (let i = 0; i < checkers.length; i++) {
      tempArr.push([...checkers[i]]);
    }

    let previousRow;
    let previousColumn;

    for (let k = 0; k < 8; k++) {
      for (let l = 0; l < 8; l++) {
        if (checkers[k][l]["isActive"]) {
          previousRow = k;
          previousColumn = l;
        }
      }
    }

    if (isIllegalMove(i, j, previousColumn, previousRow)) {
      return;
    }

    selectOrMove(tempArr, i, j, previousRow, previousColumn)
  }

  function selectOrMove(tempArr, i, j, previousRow, previousColumn) {
    const isFirstActiveClick = previousRow === undefined && previousColumn === undefined;
    const wasSamePieceClicked = previousRow === i && previousColumn === j;

    if (isFirstActiveClick) {
      const isLegalPiece = tempArr[i][j]["color"] === turn;
      if (isLegalPiece) {
        tempArr[i][j].isActive = !tempArr[i][j].isActive;
        
      } else {
        console.log("Don't select a piece that isn't yours, and don't select an empty checker.");
        return;
      }
    } else if (wasSamePieceClicked) {
      tempArr[i][j].isActive = !tempArr[i][j].isActive;
    } else if (tempArr[previousRow][previousColumn].color === tempArr[i][j].color) {
      // click yours, then click another of yours, to change your mind for which piece you want to play
      tempArr[previousRow][previousColumn]["isActive"] = false
      tempArr[i][j]["isActive"] = true
    } else {
      // It's a movement!
      tempArr[i][j] = tempArr[previousRow][previousColumn];
      tempArr[i][j]["isActive"] = false;
      tempArr[previousRow][previousColumn] = "";
      let color = 'red';
      if(turn === 'red'){
        color = 'black'
      }
      setTurn(color);
    }
    setCheckers(tempArr);
  }

  function initializeBoard() {
    const checkers = [];

    pushPieces("red", checkers);

    //empty spots
    for (let i = 3; i < 5; i++) {
      let innerArray = [];
      for (let j = 0; j < 8; j++) {
        innerArray.push("");
      }
      checkers.push(innerArray);
    }

    pushPieces("black", checkers);

    function pushPieces(color, checkers) {
      for (let i = 0; i < 3; i++) {
        let innerArray = [];
        for (let j = 0; j < 8; j++) {
          if (
            (i % 2 === 0 && color === "red") ||
            (i % 2 === 1 && color === "black")
          ) {
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
      <Board checkers={checkers} checkerClick={checkerClick} />
    </main>
  );
}

export default App;
