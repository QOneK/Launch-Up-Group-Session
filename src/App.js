import "./App.css";
import * as React from "react";
import {useState} from "react";
import Board from "./components/Board";

function App() {
  //checkers returns initial state
  const [checkers, setCheckers] = useState(initializeBoard())

  /*
  {
    color: 'red',
    isKing: false,
    isActive: false,
  }
  */

  function checkerClick(i, j) {
    let tempArr = [...checkers]
    tempArr[i][j].isActive = true
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
      const piece = {
        color: color,
        isKing: false,
        isActive: false
      }

      for (let i = 0; i < 3; i++) {
        let innerArray = [];
        for (let j = 0; j < 8; j++) {
          if ((i % 2 === 0 && color === "red") || (i % 2 === 1 && color === "black")){
            if (j % 2 === 1) {
              innerArray.push({
                color: color,
                isKing: false,
                isActive: false
              });
            } else {
              innerArray.push("");
            }
          } else {
            if (j % 2 === 0) {
              innerArray.push({
                color: color,
                isKing: false,
                isActive: false
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
