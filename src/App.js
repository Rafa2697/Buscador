
import {useState} from 'react'
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('') //input é o nome e setIput é para ser passado um valor novo para o estado

  const [cep, setCep] = useState({});

  async function handleSearch(){
   // 01001000/json/
    if(input === ''){
      alert("Preencha com algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      console.log(response.data)
      setInput("")
    }catch{
      alert('Ops, erro ao buscar');
      setInput("")
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(e) => setInput(e.target.value)}/> 
        <button className="buttonSearc" onClick={handleSearch}>
          <FiSearch size={25} color='white'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
          <main className='main'>
              <h2>CEP: {cep.cep}</h2>
              <span>{cep.logradouro}, {cep.complemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
          </main> 

      )}
     
    </div>

    

  );
}

export default App;
