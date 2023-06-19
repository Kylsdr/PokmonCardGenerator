import './Binder.css';
import Card from '../Card';
import { useEffect, useState } from 'react';

export default function Binder() {
    let [ cardNum, setNum ] = useState(0); 

    function showCards() {
        let cards = [];
        for (let i = 0; i < cardNum; i++) {
            cards.push(<Card />);
        }
        return cards;
    }

    return (
        <div>
            <div className='row gx-5'>
                <h2>Enter how many pokemon cards you would like: </h2>
                <input id="cardInput" type="number" className="form-control"
                value={cardNum} onChange={e => setNum(parseInt(e.target.value))}></input>
            </div>
            <div className="row gx-5">
                {showCards()}
            </div>
            
        </div>
    )
}