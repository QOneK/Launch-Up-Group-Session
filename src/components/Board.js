import React from 'react'

function Board({checkers, checkerClick}) {
    let black = "box-border border-[1px] b-2 w-10 h-10 bg-slate-400"
    let white = "box-border border-[1px] b-2 w-10 h-10 bg-grey"

    let activeBorder = "border-yellow-600 border-4"


    function renderDiv(i,j,ele){
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)){
        return <div className={`${white} ${ele.isActive? activeBorder: ""}`} onClick={() => {checkerClick(i, j)}}>{ele.color}</div>
      } else {
        return <div className={`${black} ${ele.isActive? activeBorder: ""}`} onClick={() => {checkerClick(i, j)}}>{ele.color}</div>
      }
    }

   
    
    let result = checkers.map((row,i)=> {
      return <div className="flex flex-wrap" key={i}>{row.map((ele,j) => { 
        return <div key={j}>{renderDiv(i,j,ele)}</div>
      })}</div>
    })
    return result
}

export default Board