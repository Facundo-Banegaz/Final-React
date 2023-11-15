import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from '../NavBar';

const url = 'http://localhost:4000/api/categorias';

const MostrarCategoria = () => {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    getCategoria();
  }, []);

  const getCategoria = async () => {
    const respuesta = await axios.get(url);
    setCategoria(respuesta.data);
  }

  const confirmDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      deleteProduct(id);
    }
  }

  const deleteProduct = async (id) => {
    const params = { headers: { 'Content-Type': 'application/json' }, data: { 'id': id } };
    await axios.delete(`http://localhost:4000/api/categorias/${id}`, params);
    getCategoria();
  }

  return (
    <>
    <div className="container-fluid bg-primary-subtle p-5">
      <NavBar />
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <Link to='/create-categoria' className="btn btn-success">Añadir otra Categoria</Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Descripcion de la categoria</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {categoria.map((cat) => (
                  <tr key={cat.Id}>
                    <td>{cat.Descripcion}</td>
                    <td>
                      <Link to={`editar/${cat.Id}`} className='btn btn-warning'>Editar</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={() => confirmDelete(cat.Id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
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

