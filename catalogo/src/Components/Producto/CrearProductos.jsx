import  {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const url = 'http://localhost:4000/api/articulos';
const urlMarca = 'http://localhost:4000/api/marcas';
const urlCategoria = 'http://localhost:4000/api/categorias';

const CrearProductos = () => {
    const[codigo, setCodigo]= useState('');
    const [nombre, setNombre] = useState('');
    const[descripcion, setDescripcion]= useState('');
    const [precio, setPrecio] = useState(1);
    const [imagenUrl, setImagenUrl] = useState('');
    const [selectedMarca, setSelectedMarca] = useState(0);
    const [selectedCategoria, setSelectedCategoria] = useState(0);



    //cargar combobox
    const [marca, setMarca] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const redirect = useNavigate();

    const numMarca = (e) => {
        const valueMarca = parseInt(e.target.value,10); 
        setSelectedMarca(valueMarca);

        console.log("es un: ", e.target.value," " ,typeof(e.target.value));
    }
    const numCategoria = (e) => {
        const valueCategoria = parseInt(e.target.value,10); 
        setSelectedCategoria(valueCategoria);
        console.log("es un: ", e.target.value," " ,typeof(e.target.value));
    }

  

  
    const getMarca = async() =>{
        const respuesta = await axios.get(urlMarca);
        setSelectedMarca(respuesta.data[0]?.Id || 0);
        setMarca(respuesta.data);
  }
      const getCategoria = async() =>{
          const respuesta = await axios.get(urlCategoria);
          //solucion al problema de no obtener el valor al mapear
          setSelectedCategoria(respuesta.data[0]?.Id || 0);
        setCategoria(respuesta.data);
    }
        useEffect(() => {
        getMarca();
        getCategoria();
    },[]);
     const store = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!codigo || !nombre || !descripcion || !precio || !imagenUrl) {
      alert("Por favor, completa todos los campos");
      return;
    }

    try {
      await axios.post(url, {
        Codigo: codigo,
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio,
        ImagenUrl: imagenUrl,
        Fk_IdMarca: selectedMarca,
        Fk_IdCategoria: selectedCategoria,
      });

      redirect('/productos');
    } catch (error) {
      console.error("Error al guardar datos:", error);
      alert("Hubo un error al guardar los datos. Por favor, inténtalo de nuevo.");
    }
  }
  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Añadir productos</div>
                    <div className="card-body">
                          <form onSubmit={store}>
                              <label>Codigo: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                             value={codigo} onChange={ (e) => setCodigo(e.target.value)}>
                            </input>
                            <label>Nombre: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                             value={nombre} onChange={ (e) => setNombre(e.target.value)}>
                            </input>
                            <label>Descripción: </label>
                            <input type='text' id='descripcion' maxLength='150' 
                            className="form-control"
                             value={descripcion} onChange={ (e) => setDescripcion(e.target.value)}>
                            </input>
                            <label>Precio: </label>
                            <input type='number' id='precio' 
                            className="form-control" step='0.1'
                             value={precio} onChange={ (e) => setPrecio(e.target.value)}>
                              </input>
                              <label>Url Imagen: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                             value={imagenUrl} onChange={ (e) => setImagenUrl(e.target.value)}>
                            </input>
                            <label>Seleccionar Marca: </label>
                            <select className="form-select" aria-label="Default select example" value={selectedMarca} onChange={numMarca}>
                                {
                                    marca.map((elemento) => (
                                        <option value={elemento.Id} key={elemento.Id}>{elemento.Descripcion}</option>
                                ))
                                }
                            </select>
                                <label>Seleccionar Categoria: </label>
                            <select className="form-select" aria-label="Default select example" value={selectedCategoria} onChange={numCategoria}>
                                {
                                    categoria.map((elemento) => (
                                        <option value={elemento.Id} key={elemento.Id}>{elemento.Descripcion}</option>
                                ))
                                }
                            </select>
                              <button className="btn btn-success mt-3">Guardar</button>
                              <Link to='/productos' className="btn btn-warning mt-3">Volver</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CrearProductos;
