import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import './Create.css'


function Create({livros, setLivros}) {
    const [titulo, setTitulo]=useState('')
    const [autor,setAutor] = useState('')
    const [ano, setAno] = useState('')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!handleCheckUrl(url)) {
          return; 
        }

        if(!handleCheckYear(ano)){
          return;
        }

        const novoLivro = {
            id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
            titulo,
            autor,
            ano: parseInt(ano, 10),
            imagem:url
        }
        setLivros([...livros, novoLivro])
      
          navigate('/');
 
  }

  const handleCheckUrl = (url) => {
  

    if (url.startsWith("http://") || url.startsWith("https://")) {
        if (url.endsWith(".jpg") || url.endsWith(".png")) {
            setError(""); 
            return true; 
        } else {
           return setError("A URL deve terminar com .jpg ou .png");
            
        }
    } else {
       return setError("A URL deve começar com http:// ou https://");
        
    }
};

const handleCheckYear = (ano) => {
  if (ano.toString().length !== 4) {
     setError("O ano de conter 4 digitos!")
     return false
  }else if(ano > 1970){
    setError(""); 
  return true; 
} else {
  setError("Ano inválido! Deve ser maior que 1970.");
  return false; 
}
}


  return (
    <div className="container">
      <h1>Criar Novo Livro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="React Fundamentos"
            required
          />
        </div>
        <div>
          <label>Autor: </label>
          <input
            type="text"
            value={autor}
            onChange={e => setAutor(e.target.value)}
             placeholder="Matheus Battisti"
            required
          />
        </div>
        <div>
          <label>Ano: </label>
          <input
            type="number"
            value={ano}
            onChange={e => setAno(e.target.value)}
            placeholder="2007"
            required
          />
        </div>
        <div>
        <label>Imagem-url:</label>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://horadecodar.com.br/wp-content/uploads/2022/04/Fundamentos-do-React.png"
            required
          />
           {error && <p className='error-message'>{error}</p>}
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}

export default Create
