import { useState } from "react";
import { useDrop } from "react-dnd";
import Box from "./components/Box";
import './App.css';

function App() {
  const [players, setPlayer] = useState([
    { name: "green" },
    { name: "blue" },
    { name: "red" },
    { name: "orange" },
    { name: "black" },
  ]);

  const [team, setTeam] = useState([]);

  const [{ isOver }, addToRightRef] = useDrop({
    accept: "leftBox",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });


  const [{ isOver: isPlayerOver }, removeFromRightRef] = useDrop({
    accept: "rightBox",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const moveBoxToRight = (item) => {
    setTeam((prev) => prev.filter((_, i) => item.index !== i));
    setTeam((prev) => [...prev, item]);
    
    team.forEach(teamItem=>{
      if((teamItem.name === item.name)){
        alert('This color is already Moved')
        setTeam( [...team]);
      }
    })
  };
//  Element Code Delete Code 
const deleteItem = (evet)=>{
  evet.target.classList.add('active');
  document.body.onkeydown=(evt)=>{
    if(evt.key === "Delete"){
        let cItem= team.find(item=>item.name)
        let cIndex=team.indexOf(cItem)
        if(cIndex != -1 ){
            team.splice(cIndex, 1)
            setTeam([...team])
        }
    }
    
};

}





  return (
    <div className="container">
      <div className="bg-dark text-white text-center py-3 mb-5 display-4 font-weight-bold ">Dragable Items in React</div>
          <div class="row m-0 justify-content-between">
            <div className="col-md-5 col-lg-5 border p-0 shadow">
                 <div className="text-center bg-success text-white h3 py-3">This is box 1</div>
               <div class="row m-0 justify-content-between"
               ref={removeFromRightRef}
               >
                    {
                        players.map((singleItem, index) => (
                          <Box item={singleItem} key={index}  index={index} playerType="leftBox"  onDropPlayer={moveBoxToRight}/>
                        ))
                    }
          </div>
          </div>
          <div className="col-md-5 col-lg-5 border p-0 shadow">
        <div className="text-center bg-warning text-white h3 py-3">This is box 2</div>
          
          <div className="row m-0 justify-content-arround" style={{height:"200px"}} ref={addToRightRef}>
         
            {
            team.map((singleItem, index) => (
              <Box item={singleItem} key={index} index={index} playerType="rightBox" delFunction={deleteItem}/>
            ))
            
            }
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
