import React from 'react'
import Card from '../Card/Card'
import './Column.scss'
import { mapOrder } from '../../utilites/sorts';

function Column(props) {

  const {column} = props;
  // const cards = column.cards;
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <>
        <div className="column">
          <header>{column.header}</header>
          <h1>{column.title}</h1>
          <ul className="card-list">
            { cards && cards.length > 0 && cards.map((card, index) => {
              return (
                <Card 
                  key={card.id}
                  card={card}
                />
              )

            }) }
          </ul>
          <h2>{column.subtitleFirst}</h2>
          <ul className="card-list">
            { cards && cards.length > 0 && cards.map((card, index) => {
              return (
                <Card 
                  key={card.id}
                  card={card}
                />
              )

            }) }
          </ul>

          <h2>{column.subtitleSecond}</h2>
          <ul className="card-list">
            { cards && cards.length > 0 && cards.map((card, index) => {
              return (
                <Card 
                  key={card.id}
                  card={card}
                />
              )

            }) }
          </ul>
          <footer>Add another card</footer>
        </div>

    </>
  )
}

export default Column
