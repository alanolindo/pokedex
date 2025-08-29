import { useEffect, useState, useRef } from "react";
import axios from "axios";
import './style.css';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function App() {

  const [pokemons, setPokemons] = useState([])
  const carrosssel = useRef(null);
  const getPokemons = async () => {

    var endpoints = []
    for (var i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }
      var response = axios.all(endpoints.map((endpoint)=>axios.get(endpoint))).then((res)=>setPokemons(res));
      return response

  }


  useEffect(() => {
    getPokemons()

  }, [])

  function irParaEsquerda(e){
e.preventDefault();
carrosssel.current.scrollLeft-=carrosssel.current.offsetWidth
  }

 function irParaDireita(e){
e.preventDefault();
carrosssel.current.scrollLeft+=carrosssel.current.offsetWidth
  }
  return (
     <div className="container">
  <div className="container-cards" ref={carrosssel}>
    {pokemons.map((item) => (
      <div key={item.data.id} className="pokemon">
        <h1>{item.data.name}</h1>
        <img src={item.data.sprites.front_default} alt={item.data.name} />
        <h3>{item.data.types[0].type.name}</h3>
      </div>
    ))}
  </div>
  <div className="button">
    <button onClick={irParaEsquerda}><FaArrowAltCircleLeft /></button>
    <button onClick={irParaDireita}><FaArrowAltCircleRight /></button>
  </div>
</div>

  );
}

