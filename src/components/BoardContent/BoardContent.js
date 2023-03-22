import React, { useState, useEffect } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column';
import { initData } from '../../action/initData';
import _ from 'lodash';
import { mapOrder } from '../../utilites/sorts';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../utilites/dragDrop';  

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
    // console.log(">>>> inside onColumnDrop", dropResult);
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    // console.log(">>>> inside onColumnDrop newColumns", newColumns);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map(column => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);

  }; 

  function onCardDrop(dropResult, columnId){
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      // console.log(">>>> inside onCardDrop", dropResult, "with columnId", columnId)

      let newColumns = [...columns];
      let currentColumn = newColumns.find(column => column.id === columnId);
   

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map(card => card.id);
      
      console.log("currentColumns", currentColumn);

      setColumns(newColumns)

    }
  }

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
              onCardDrop={onCardDrop}
              />
              </Draggable>
            )
          })}

          <div className='add-new-column'>
            <i className='fa fa-plus icon'></i>Add another column
          </div>

          </Container>
      </div>
    </>
  );
}

export default BoardContent;
