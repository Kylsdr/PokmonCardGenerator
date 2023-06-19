import { Pokemon } from "pokenode-ts";
import api from "../API";
import './Card.css'
import { useEffect, useState } from "react";

interface colorsI {
  [key: string]: string;
}

const colors: colorsI = {
  bug: "olive",
  dark: "rgb(20, 19, 19)",
  dragon: "rgb(105, 54, 172)",
  electric: "rgb(224, 188, 27)",
  fairy: "pink",
  fighting: "brown",
  ghost: "rgb(34, 34, 94)",
  grass: "rgb(54, 139, 54)",
  ground: "tan",
  ice: "turquoise",
  normal: "antiquewhite",
  poison: "rgb(67, 8, 122)",
  psychic: "rgb(196, 43, 101)",
  rock: "rgb(129, 88, 34)",
  steel: "grey",
  water: "rgb(49, 49, 230)",
  flying: "rgb(101, 101, 160)",
  fire: "red"
};

export default function Card() {
  let [mon, setMon] = useState({
    name: "", 
    types: [] as string[],
    moves: [] as string[],
    sprite: ""
  });

  let randMon = Math.floor(Math.random() * 1008) + 1;

  useEffect(() => {
    async function fetchData() {
      await api.getPokemonById(randMon).then((data) => setMon({
        name: data.name,
        types: data.types.map((x) => x.type.name),
        moves: data.moves.map((x) => x.move.name),
        sprite: data.sprites.front_default || "test"
      }));
    }
    fetchData();
  }, []);

  const getRandomMoves = () => {
    const shuffled = mon.moves.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);
    
    return selected.map((x) => <li>{x}</li>);
  }

  return (
    <div className="col">
      <div className={`cardDiv ${mon.types[0]}`}>
        <div className="cardTop">
            <p>{mon.name}</p>
          <div className="cardWindow">
            <img className="cardImg" src={mon.sprite}></img>
          </div>
        </div>
        <div className="cardP">
            { mon.types.length > 1 ? 
            <p className="cardTypes" style={
              {background: `linear-gradient(${colors[mon.types[0]]}, ${colors[mon.types[1]]})`}
              }>{mon.types[0]} {mon.types[1]}</p> 
              : 
              <p className="cardTypes" style={{border: "inset"}}>{mon.types[0]} {mon.types[1]}</p>
              }
            <ul className="moveList">
              {getRandomMoves()}
            </ul>
        </div>
      </div>
    </div>
  );
}
