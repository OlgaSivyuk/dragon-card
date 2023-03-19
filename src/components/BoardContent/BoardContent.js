import React, { useState, useEffect } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column';
import { initData } from '../../action/initData';
import _ from 'lodash';
import { mapOrder } from '../../utilites/sorts';

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
        {columns && columns.length > 0 && columns.map((column, index) => {
          console.log('column', column)
            return (
              <Column  
              key={column.id}
              column={column}
              />
            )
          })}
      </div>
    </>
  );
}

export default BoardContent;
