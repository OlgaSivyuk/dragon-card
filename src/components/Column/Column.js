import React, {useEffect, useRef, useState} from 'react'
import Card from '../Card/Card'
import './Column.scss'
import { mapOrder } from '../../utilites/sorts';
import { Container, Draggable } from "react-smooth-dnd";
import Dropdown from 'react-bootstrap/Dropdown'
import ConfirmModal from '../Common/ConfirmModal';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilites/constant';


function Column(props) {

  const {column, onCardDrop, onUpdateColumn} = props;
  // const cards = column.cards;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  // function onCardDrop(dropResult, columnId){
  //   if(dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
  //     console.log(">>>> inside onCardDrop", dropResult, "with columnId", columnId)
  //   }
  // }

  const [isShowModalDelete, setShowModalDelet] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const [isFirstClick, setFirstClick] = useState(true);
  const [isShowAddNewCard, setShowAddNewCard] = useState(false);
  const [valueTextArea, setValueTextArea ] = useState('')

  const textAreaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isShowAddNewCard === true && textAreaRef && textAreaRef.current){
      textAreaRef.current.focus()
    }

  }, [])


  useEffect(() => {
    if (column && column.title){
      setTitleColumn(column.title)
    }

  }, [])

  const toggleModal = () => {
    setShowModalDelet(!isShowModalDelete)
  }

  const onModalAction = (type) => {
    console.log(type);
    if (type ===  MODAL_ACTION_CLOSE) {
  //do nothing
    }
    if (type ===  MODAL_ACTION_CONFIRM) {
      // remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleModal();
  }

  const selectAllText = (event) => {
    setFirstClick(false);
    if (isFirstClick) {
      event.target.select();
    } else {
      inputRef.current.setSelectionRange(titleColumn.length, titleColumn.length)
    }
    // event.target.focus();
  };

  const handleClickOutside = () => {
    // do something
    setFirstClick(true);
    const newColumn = {
      ...column,
      title: titleColumn,
      _destroy: false
    }
    onUpdateColumn(newColumn)
  }

  const handleAddNewCard = () => {
    //validate
    if(!valueTextArea){
      textAreaRef.current.focus();
      return
    }

    const newCard = {
        id: uuidv4(),
        boardId: column.boardId,
        columnId: column.id,
        title: valueTextArea,
        image: null
    }

   
    let newColumn = {...column};
    newColumn.cards = [...newColumn.cards, newCard];
    newColumn.order = newColumn.cards.map(card => card.id);

    console.log("newColumn", newColumn);

    onUpdateColumn(newColumn);
    setValueTextArea('');
    setShowAddNewCard(false);
  }

  return (
    <>
      <div className="column">
        <header className="column-drag-handle">
          {/* {column.header} */}
          <div className='column-title'>
          {/* {column.title} */}
          <Form.Control 
          size={'sm'}
          type='text'
          value={titleColumn}
          className='customize-input-column'
          onClick={selectAllText}
          onChange={(event) => setTitleColumn(event.target.value)}
          spellCheck='false'
          onBlur={handleClickOutside}
          onMouseDown={(e) => {e.preventDefault()}}
          />
          </div>
          <div className='column-dropdown'>
        <Dropdown>
            <Dropdown.Toggle variant='' id="dropdown-basic" size='sm'>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item href="#">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        </header>
        {/* <h1>
          {column.title}
        </h1> */}
        <div className="card-list">
          <Container
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            groupName="col"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "card-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => {
                return (
                  <Draggable key={card.id}>
                    <Card card={card} />
                  </Draggable>
                );
              })}
          </Container>

     {isShowAddNewCard === true &&    
        <div className='add-new-card'>
              <textarea 
                className="form-control" 
                // type="text" 
                rows='2'
                placeholder='Enter a title for this card...'
                ref={textAreaRef}
                value={valueTextArea}
                onChange={(event) => setValueTextArea(event.target.value)}
              ></textarea>
              <div className="group-btn">
                <button 
                className="btn btn-primary" 
                onClick={() => handleAddNewCard()}
                >
                  Add card
                </button>
                <i className="fa fa-times icon"  onClick={() => setShowAddNewCard(false)}></i>
              </div>
        </div>
      }
        </div>
      {isShowAddNewCard === false &&      
        <footer>
          <div className="footer-action" onClick={() => setShowAddNewCard(true)}>
            <i className="fa fa-plus icon" ></i>
            Add another card
          </div>
        </footer>
      }
      </div>
      <ConfirmModal
      show={isShowModalDelete}
      title={'Remove a column'}
      content={`Are you shure to remove this column: <b>${column.title}<b>`}
      onAction={onModalAction}

      /> 
      
    </>
  );
}

export default Column


//  {/* <h2>{column.subtitleFirst}</h2>
//           <ul className="card-list">
//             { cards && cards.length > 0 && cards.map((card, index) => {
//               return (
//                 <Draggable key={card.id}>
//                 <Card 
//                   card={card}
//                 />
//                 </Draggable>
//               )

//             }) }
//           </ul>

//           <h2>{column.subtitleSecond}</h2>
//           <ul className="card-list">
//             { cards && cards.length > 0 && cards.map((card, index) => {
//               return (
//                 <Card 
//                   key={card.id}
//                   card={card}
//                 />
//               )

//             }) }
//           </ul> */}

// {/* <Container>
// onDragStart={e => console.log("drag started", e)}
//                     // onDragEnd={e => console.log("drag end", e)}
//                     // onDragEnter={() => {
//                     //   console.log("drag enter:", column.id);
//                     // }}
//                     // onDragLeave={() => {
//                     //   console.log("drag leave:", column.id);
//                     // }}
//                     // onDropReady={p => console.log('Drop ready: ', p)}
// </Container> */}