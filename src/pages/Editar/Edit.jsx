import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Edit.css";

function Edit({ livros, setLivros }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Encontrar o livro a ser editado
  const livro = livros.find((l) => l.id === parseInt(id, 10));

  // Estados para formulário
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (livro) {
      setTitulo(livro.titulo);
      setAutor(livro.autor);
      setAno(livro.ano);
      setUrl(livro.imagem);
      setError("");
    }
  }, [livro]);

  if (!livro) {
    return (
      <div>
        Livro não encontrado. <Link to="/">Voltar</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!handleCheckUrl(url)) {
      return;
    }

    if(!handleCheckYear(ano)){
      return;
    }

    const livroAtualizado = {
      ...livro,
      titulo,
      autor,
      ano: parseInt(ano, 10),
      imagem: url,
    };

    const index = livros.findIndex((l) => l.id === livro.id);
    const novaLista = [...livros];
    novaLista[index] = livroAtualizado;

    setLivros(novaLista);
    navigate("/");
  };

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
      
      
  
  };

  return (
    <div className="container">
      <h1>Editar Livro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Autor: </label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ano: </label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagem-Url: </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default Edit;
