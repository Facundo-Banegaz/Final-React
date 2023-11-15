import  { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Card from "./Card";


const url = "http://localhost:4000/api/articulos";


function Home() {
  const [articulos, setArticulos] = useState([]);
  const [articuloList, setArticuloList] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [sinResultados, setSinResultados] = useState(false);

  const getArticulos = async () => {
    const respuesta = await axios.get(url);
    setArticulos(respuesta.data);
    setArticuloList(respuesta.data);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    setSinResultados(false); // Resetear el estado cuando se cambia la búsqueda
  };

  const handleSearch = () => {
    const terminoBusqueda = busqueda.toLowerCase();
    const resultadosBusqueda = articuloList.filter(
      (elemento) =>
        elemento.Nombre.toLowerCase().includes(terminoBusqueda) ||
        elemento.Marca.toLowerCase().includes(terminoBusqueda) ||
        elemento.Categoria.toLowerCase().includes(terminoBusqueda)
    );

    if (resultadosBusqueda.length > 0) {
      setArticulos(resultadosBusqueda);
      setSinResultados(false);
    } else {
      setArticulos([]);
      setSinResultados(true);
    }
  };

  useEffect(() => {
    getArticulos();
  }, []);

  return (
    <div className="bg-primary-subtle">
      <NavBar />
      <div className="input-group mb-3 p-5">
        <input
          type="text"
          maxLength="180"
          className="form-control"
          required=""
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar Articulos"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {sinResultados ? (
        <div className="mb-3 text-center">
          <img src="https://tse3.mm.bing.net/th?id=OIP.-CiVIfCy46VrgitiIjfahwAAAA&pid=Api&P=0&h=180" alt="No encontrado" width={150} />
          <p>No se encontraron resultados. Utiliza palabras genéricas o navega por las categorías para encontrar productos similares.</p>
          <a className="btn btn-dark" href="/">Ir a Productos</a>
        </div>
      ) : (
        <Card art={articulos} />
      )}
    </div>
  );
}

export default Home;
