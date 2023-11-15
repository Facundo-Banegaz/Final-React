import  {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditarCategoria = () => {
    const[descripcion, setDescripcion]= useState('');
    const {id} = useParams();
    const redirect = useNavigate();
    

    useEffect( () =>{
        const getCategoria = async() =>{
            const options = {headers: {'Content-Type': 'application/json'},params:{id:id} };
            const respuesta = await axios.get(`http://localhost:4000/api/categorias/${id}`,options);
            setDescripcion(respuesta.data[0].Descripcion);
        }
        getCategoria();
    },[]);

    const update = async(e) =>{
        e.preventDefault();
        if ( !descripcion ) {
      alert("Por favor, completa el  campo requerido");
      return;
    }
        await axios.put(`http://localhost:4000/api/categorias/${id}`, {
            Descripcion: descripcion
        });
        redirect('/categorias');
    }

  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Editar Categoria</div>
                    <div className="card-body">
                        <form onSubmit={update}>
                            <label>Descripcion: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                             value={descripcion} onChange={ (e) => setDescripcion(e.target.value)}>
                            </input>
                              <button className="btn btn-success mt-3">Guardar</button>
                              <Link to={"/categorias"} className="btn btn-warning  mt-3">volver</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditarCategoria;