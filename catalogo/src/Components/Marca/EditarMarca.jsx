import  {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate,useParams  } from "react-router-dom";
import { Link } from "react-router-dom";


const EditarMarca = () => {
    const[descripcion, setDescripcion]= useState('');
    const {id} = useParams();
    const redirect = useNavigate();
    

    const getMarca = async() =>{
            const options = {headers: {'Content-Type': 'application/json'},params:{id:id} };
            const respuesta = await axios.get(`http://localhost:4000/api/marcas/${id}`,options);
            setDescripcion(respuesta.data[0].Descripcion);
            console.log(respuesta.data[0].Descripcion);
    }
    
    useEffect( () =>{
        getMarca();
    },[]);

    const update = async(e) =>{
        e.preventDefault();
        if ( !descripcion ) {
      alert("Por favor, completa todos los campos");
      return;
    }
        await axios.put(`http://localhost:4000/api/marcas/${id}`, {
            Descripcion: descripcion
        });
        redirect('/marcas');
    }

  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Editar Marca</div>
                    <div className="card-body">
                        <form onSubmit={update}>
                            <label>Descripcion: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                             value={descripcion} onChange={ (e) => setDescripcion(e.target.value)}>
                            </input>
                              <button className="btn btn-success mt-3">Guardar</button>
                              <Link to='/marcas' className="btn btn-warning mt-3">Volver</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditarMarca;
