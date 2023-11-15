import  {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from '../NavBar';
const url = 'http://localhost:4000/api/marcas';

const MostrarCategoria = () => {
    const [marca, setMarca] = useState([]);

    useEffect(() => {
        getMarca();
    }, []);
    
    const getMarca = async() =>{
        const respuesta = await axios.get(url);
        setMarca(respuesta.data);
    }
    const confirmDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta Marca?")) {
      deleteProduct(id);
    }
  }
    const deleteProduct = async(id) =>{
        const params  = {headers: {'Content-Type':'application/json'},data:{'id':id}};
        await axios.delete(`http://localhost:4000/api/marcas/${id}`,params);
        getMarca();
    }
    return (
      <>
      <div className="container-fluid bg-primary-subtle p-5">
          <NavBar/>
        <div className="row mt-3">
            <div className="col-md-4 offset-md-4">
                <div className="d-grid mx-auto">
                    <Link to='/create-marca' className="btn btn-success">Añadir otra Marca</Link>
                </div>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                              <tr>
                                  <th>Descripcion de la Marca</th>
                                  <th>Acciones</th>
                              </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            { marca.map( (mar)=>(
                                <tr key={mar.Id}>
                                    <td>{mar.Descripcion}</td>
                                    <td>
                                        <Link to={`editar/${mar.Id}`} className='btn btn-warning'>Editar</Link>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={()=>confirmDelete(mar.Id)}>Eliminar</button>
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

export default MostrarCategoria;
