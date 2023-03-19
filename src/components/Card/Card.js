import React from 'react';
import './Card.scss';

// import design from '../../images/design.png';

function Card(props) {

  const { card } = props;

  return (
    <>
      <li className="card-item">
        {card.image && <img className="card-cover" src={card.image} alt="" />}
        {card.title}
      </li>
    </>
  );
}

export default Card
