import  {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from '../NavBar';
const url = 'http://localhost:4000/api/articulos';

const MostrarProductos = () => {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
        getProducts();
    }, []);
  
    const getProducts = async() =>{
        const respuesta = await axios.get(url);
        setProducts(respuesta.data);
  }
  
    const confirmDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este Producto?")) {
      deleteProduct(id);
    }
  }
    const deleteProduct = async(id) =>{
        const params  = {headers: {'Content-Type':'application/json'},data:{'id':id}};
        await axios.delete(`http://localhost:4000/api/articulos/${id}`,params);
        getProducts();
    }
    return (
        <>
        <NavBar/>
        <div className="container-fluid bg-primary-subtle p-2">
        <div className="row mt-3">
            <div className="col-md-4 offset-md-4">
                <div className="d-grid mx-auto">
                    <Link to='/crear-producto' className="btn btn-success">Añadir otro Producto</Link>
                </div>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                              <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                {/* <th>Descripcion</th> */}
                                <th>Precio</th>
                                <th>Foto</th>
                                <th>Marca</th>
                                <th>Categoria</th>
                                <th>Acciones</th>
                              </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            { products.map((product)=>(
                                <tr key={product.Id}>
                                    <td>{product.Codigo}</td>
                                    <td>{product.Nombre}</td>
                                    {/* <td>{product.Descripcion}</td> */}
                                    <td>$ {new Intl.NumberFormat('es-ar').format(product.Precio)}</td>
                                    <td><img src={product.ImagenUrl} alt={product.Nombre} width={120}/></td>
                                    <td>{product.Marca}</td>
                                    <td>{product.Categoria}</td>
                                    <td>
                                        <Link to={`editar/${product.Id}`} className='btn btn-warning'>Editar</Link>
                                        
                                        <button className="btn btn-danger" onClick={()=>confirmDelete(product.Id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            </div>
    </>
  )
}

export default MostrarProductos;
