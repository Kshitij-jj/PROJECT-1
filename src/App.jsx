import "./App.css"
import { useState } from "react";

const Box =({value,onClick})=>{

 
  return <div className="Box" onClick={onClick}>{value}</div>;
}
const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [next, setNext] = useState(true)
  const [iswinner, setIswinner] = useState('None');
  const [iswin, setIsWin] =useState(false);
  const [storeuserclick, setStoreUserClick] = useState([])
  function Winlogic(board){
    const winpattern = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6],            
];

      for (const pattern of winpattern) {
        const [a,b,c]=pattern;
        if(board[a]&&board[a]===board[b]&&board[b]===board[c]) 
        {
  
          return board[a];
        
        }
        
          }
          return null;
    }
  const handelClick=(index)=>{

     if(state[index]) return;
      const newState= [...state];
      const newmoveorder= [...storeuserclick];
      newmoveorder.push(index)
      if(newmoveorder.length===9)
    {
   
      const fristindex =  newmoveorder.shift();
    
      newState[fristindex] = null;
    }
    if(iswin) return;
    newState[index]=next?"X":"O";
    const win = Winlogic(newState)
    setState(newState)
    setStoreUserClick(newmoveorder)
    
    
    if(win)
      {
        setIswinner(win);
        setIsWin(true);
      }
      else
      {
        setNext(prev=>!prev);

      }
  


  }
  function resetgame(){
    setState(Array(9).fill(null))
    setNext(true)
    setIswinner("None")
    setIsWin(false)
    setStoreUserClick([])
  }

 return <div className="container">
  <div className="Boxes">
 {
  state.map((item,index)=>(<Box value={item} key={index} onClick={()=>handelClick(index)} />))
 }
  </div>
  
  <button onClick={resetgame}>reset</button>
  <div className={iswinner?"status":"optional"}>{iswinner?`Winner ${iswinner}`:`Winner ${iswinner}`}</div>
 </div>
};

export default App;