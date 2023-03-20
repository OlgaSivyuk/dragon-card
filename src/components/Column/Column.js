import React from 'react'
import Card from '../Card/Card'
import './Column.scss'
import { mapOrder } from '../../utilites/sorts';
import { Container, Draggable } from "react-smooth-dnd";

function Column(props) {

  const {column} = props;
  // const cards = column.cards;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');
  function onCardDrop(dropResult){
    console.log(">>>> inside onCardDrop", dropResult)
  }

  return (
    <>
        <div className="column">
          <header className="column-drag-handle">{column.header}</header>
          <h1>{column.title}</h1>
          <div className="card-list">
            <Container
                    onDrop={onCardDrop}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    groupName="col"
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >


            { cards && cards.length > 0 && cards.map((card, index) => {
              return (
                <Draggable key={card.id}>
                <Card 
                  card={card}
                />
                </Draggable>
              )
            }) }

            </Container>
          </div>
          <footer>Add another card</footer>
        </div>

    </>
  )
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