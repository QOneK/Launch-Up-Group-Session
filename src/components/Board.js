import React from 'react'

function Board({checkers}) {
    let black = "box-border border-[1px] b-2 w-10 h-10 bg-slate-400"
    let white = "box-border border-[1px] b-2 w-10 h-10 bg-grey"
    
    function renderDiv(i,j,ele){
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          return <div className={white}>{ele}</div>
        } else {
          return <div className={black}>{ele}</div>
        }
      } else {
        if (j % 2 === 0) {
          return <div className={black}>{ele}</div>
        } else {
          return <div className={white}>{ele}</div>
        }
      }  
    }
    let result = checkers.map((row,i)=>{
      return <div className="flex flex-wrap">{row.map((ele,j) => renderDiv(i,j,ele))}</div>
    })
    return result
}

export default Board