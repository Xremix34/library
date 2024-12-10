import { Link } from 'react-router-dom';
import './Home.css'

function Home({ livros, setLivros }) {
  const handleDelete = (id) => {
    const novosLivros = livros.filter((livro) => livro.id !== id);
    setLivros(novosLivros);
  };
  return (
    <div className='container'>
      <h1>Lista de Livros</h1>
      <Link to="/create"><button className='add-book'>Adicionar novo Livro</button></Link>
      
      <ul>
        {livros.map(livro =>(
        <li key={livro.id}>
          <div className='container-book'>
          <p><Link to={`/view/${livro.id}`}>{livro.titulo}  - {livro.autor} ({livro.ano})</Link></p>
          <div className='case'><img src={livro.imagem}/></div>
    
        <Link to={`/edit/${livro.id}`}><button>Editar</button></Link>
      
        <button onClick={()=>handleDelete(livro.id)}>Excluir</button>
        </div>
        </li>
    ))}
      </ul>
    </div>
  );
}

export default Home;
