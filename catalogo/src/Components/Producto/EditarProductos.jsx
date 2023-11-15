import  {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const urlMarca = 'http://localhost:4000/api/marcas';
const urlCategoria = 'http://localhost:4000/api/categorias';

const EditarProducto = () => {
  
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


    const {id} = useParams();
    const redirect = useNavigate();

      const getProducto = async () => {
    try {
      const options = { headers: { 'Content-Type': 'application/json' }, params: { id: id } };
      const respuesta = await axios.get(`http://localhost:4000/api/articulos/${id}`, options);

      setCodigo(respuesta.data[0].Codigo);
      setNombre(respuesta.data[0].Nombre);
      setDescripcion(respuesta.data[0].Descripcion);
      setPrecio(respuesta.data[0].Precio);
      setImagenUrl(respuesta.data[0].ImagenUrl);
      // Actualiza los estados con los IDs correctos para las opciones seleccionadas
      setSelectedMarca(respuesta.data[0].IdMarca);
      setSelectedCategoria(respuesta.data[0].IdCategoria);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  };

    
    const getMarca = async () => {
    try {
      const respuesta = await axios.get(urlMarca);
      setMarca(respuesta.data);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };
    const getCategoria = async () => {
    try {
      const respuesta = await axios.get(urlCategoria);
      setCategoria(respuesta.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

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


    
  useEffect(() => {
            getMarca();
            getCategoria();
            getProducto();
    },[]);


const update = async(e) =>{
  e.preventDefault();
  
    if (!codigo || !nombre || !descripcion || !precio || !imagenUrl) {
      alert("Por favor, completa todos los campos");
      return;
    }
  await axios.put(`http://localhost:4000/api/articulos/${id}`, {
    Codigo: codigo,
    Nombre: nombre,
    Descripcion: descripcion,
    Precio: precio,
    ImagenUrl: imagenUrl,
    Fk_IdMarca: selectedMarca,
     Fk_IdCategoria: selectedCategoria
  });
        redirect('/productos');
    }
  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Editar producto</div>
                    <div className="card-body">
                          <form onSubmit={update}>
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

export default EditarProducto;
