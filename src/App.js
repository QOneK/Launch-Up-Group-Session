import "./App.css";
import * as React from "react";
import { useState } from "react";
import Board from "./components/Board";

function App() {
  //checkers returns initial state
  const [checkers, setCheckers] = useState(initializeBoard());
  const [turn, setTurn] = useState(false);

  function legalMove() {}

  function nonSelectedDeactivate(i, j) {
    let color;
    if (turn) {
      color = "red";
    } else {
      color = "black";
    }

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const isCurrentActive = r === i && j === c;
        const isSameColorAsCurrentActive = checkers[r][c]["color"] === color;
        if (isSameColorAsCurrentActive && !isCurrentActive) {
          checkers[r][c]["isActive"] = false;
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

  function isIllegalMove(i, j, previousColumn, previousRow) {
    // 1) Illegal empty space (which should never be placed)

    // To a black space that is not legal
    // King can move back but normal can't (1.2)
    // You can't "fly" to another black square
    // To a opponent checker piece
    // To your own checker piece
    // 2) Legal to another black square

    //If there is red/black there

    // 1.1 - White Space
    const isBothEven = i % 2 === 0 && j % 2 === 0;
    const isBothOdd = i % 2 !== 0 && j % 2 !== 0;
    //  return isBothEven || isBothOdd;

    // 1.2 - Move pieces backwards
    // (if king then valid, if NOT king then not valid)

    //'checkers' is accessible and works here
    //if black, then value of i cannnot be higher
    //if red, then value of i cannot be lower

    //color
    let color;
    if (turn) {
      color = "red";
    } else {
      color = "black";
    }

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

    if (checkers[previousRow][previousColumn]["isKing"] === false) {
      // 2 more additional illegal moves
      // cannot move greater than 2 spaces if there is no opposition piece directly diagonal
      // cannot move greater more than 1 space if there is no opposition piece directly diagonal
      if (color === "red") {
        if (i <= previousRow) {
          return true;
        }
        // else if (
        //   // so if BR or BL is true - unlock 2 row move
        // ){
        //   // now that I have the corners - illegal move would be to move >3 and <1
        // }
      } else if (color === "black") {
        if (i >= previousRow) {
          return true;
        }
      }
    } else if (checkers[previousRow][previousColumn]["isKing"] === true) {
      //we can do this later
    }

    return;
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

    const isFirstActiveClick =
      previousRow === undefined && previousColumn === undefined;
    const isNotEmptyCell = tempArr[i][j] !== "";

    if (
      !isFirstActiveClick &&
      isIllegalMove(i, j, previousColumn, previousRow)
    ) {
      return;
    }

    let color;
    if (turn) {
      color = "red";
    } else {
      color = "black";
    }

    if (isFirstActiveClick) {
      const isLegalPiece = tempArr[i][j]["color"] === color;
      if (isLegalPiece && isNotEmptyCell) {
        tempArr[i][j].isActive = !tempArr[i][j].isActive;
        setCheckers(tempArr);
      } else {
        console.log("wrong piece. not yours");
      }
    } else if (previousRow === i && previousColumn === j) {
      tempArr[i][j].isActive = !tempArr[i][j].isActive;
      setCheckers(tempArr);
      // } else if () {
    } else {
      tempArr[i][j] = tempArr[previousRow][previousColumn];
      tempArr[i][j]["isActive"] = false;
      tempArr[previousRow][previousColumn] = "";
      setTurn(!turn);
      setCheckers(tempArr);
    }
  }

  // nonSelectedDeactivate(i, j)

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
