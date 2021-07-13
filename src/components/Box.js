import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";

const Box = ({ item, playerType, onDropPlayer, index,delFunction }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: playerType,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
   

   
    <div  className={"col-md-3 col-lg-3 mt-3 text-center py-3 rounded "+ item.name}  ref={dragRef} onClick={delFunction}>
      {item.name}
    </div>
    
  
  );
};

export default Box;
