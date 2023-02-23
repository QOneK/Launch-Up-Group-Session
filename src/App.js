import "./App.css";
import * as React from "react";

function App() {
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

  console.log(checkers)

  function pushPieces(color, checkers) {
    for (let i = 0; i < 3; i++) {
      let innerArray = [];
      for (let j = 0; j < 8; j++) {
        if ((i % 2 === 0 && color === "red") || (i % 2 === 1 && color === "black")){
          if (j % 2 === 1) {
            innerArray.push(color);
          } else {
            innerArray.push(" ");
          }
        } else {
          if (j % 2 === 0) {
            innerArray.push(color);
          } else {
            innerArray.push(" ");
          }
        }
      }
      checkers.push(innerArray);
    }
  }
  //How do you npm start to see the local host, won't let me
  //<= that is npm output

  function makeArray() {
    let black = "box-border border-4 b-2 w-10 h-10 bg-black"
    let white = "box-border border-4 b-2 w-10 h-10 bg-grey"
    let array = []

    let insideArr = [
                      <div className="box-border border-4 b-2 w-10 h-10 bg-slate-400">
                      1
                    </div>,
                    <div className="box-border border-4 b-2 w-10 h-10 bg-grey">
                      2
                    </div>,
                    <div className="box-border border-4 b-2 w-10 h-10 bg-slate-400">
                      3
                    </div>
                    ]

      for (let i = 0 ; i < 2 ; i++) {
        array.push(<div className="flex flex-wrap">{insideArr}</div>)
        // for (let j = 0 ; j < 9 ; j++) {
        //   if (i % 2 === 0) {
        //     if (j % 2 === 0) {
        //       array[i][j].push(<div className={black}>{j}</div>)
        //     } else {
        //       array[i][j].push(<div className={white}>{j}</div>)
        //     }
        //   } else {
        //     if (j % 2 === 0) {
        //       array[i][j].push(<div className={white}>{j}</div>)
        //     } else {
        //       array[i][j].push(<div className={black}>{j}</div>)
        //     }
        //   }          
        // }
      } 

    return array
  }

  return (
    <main>
      {/* <div>
      {
        [
          <div className="flex flex-wrap">
            {[<div>1</div>,<div>2</div>,<div>3</div>]}
          </div>,
          <div className="flex flex-wrap">
            {[<div>4</div>,<div>5</div>,<div>6</div>]}
          </div>
        ]
      }
      </div> */}
      {makeArray()}
      <div>
        <div className="flex flex-wrap">
          <div className="box-border border-4 b-2 w-10 h-10 bg-black">
            1
          </div>
          <div className="box-border border-4 b-2 w-10 h-10 bg-grey">
            2
          </div>
          <div className="box-border border-4 b-2 w-10 h-10 bg-black">
            3
          </div>
        </div> 
        <div className="flex flex-wrap">
          <div className="box-border border-4 b-2 w-10 h-10 bg-grey">
            4
          </div>
          <div className="box-border border-4 b-2 w-10 h-10 bg-black">
            5
          </div>
          <div className="box-border border-4 b-2 w-10 h-10 bg-grey">
            6
          </div>
        </div> 
      </div>

    </main>
  );
  
}

export default App;
