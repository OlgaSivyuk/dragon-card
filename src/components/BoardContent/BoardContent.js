import React, { useState, useEffect } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column';
import { initData } from '../../action/initData';
import _ from 'lodash';
import { mapOrder } from '../../utilites/sorts';
import { Container, Draggable } from "react-smooth-dnd";

 function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardInitData = initData.boards.find(item => item.id === 'board-1');
    if (boardInitData) {
      setBoard(boardInitData);

      // sort columns

      // вынесли в отдельную утилиту - sorts и упростили функцию
      // boardInitData.columns.sort((a,b) => 
      //   boardInitData.columnOrder.indexOf(a.id) - boardInitData.columnOrder.indexOf(b.id))
      // setColumns(boardInitData.columns);
      
      setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, "id"))

    }
  }, []);

  console.log('columns', columns)

  function onColumnDrop(dropResult){
    console.log(">>>> inside onColumnDrop", dropResult)

  }; 

  if(_.isEmpty(board)){
    return (
      <>
      <div className="not-found">Board not found</div>
      </>
    )
  }


  return (
    <>
      <div className="board-columns">
      <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
        {columns && columns.length > 0 && columns.map((column, index) => {
          console.log('column', column)
            return (
              <Draggable key={column.id}>
              <Column  
              column={column}
              />
              </Draggable>
            )
          })}
          </Container>
      </div>
    </>
  );
}

export default BoardContent;
