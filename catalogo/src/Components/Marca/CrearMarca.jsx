import  {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const url = 'http://localhost:4000/api/marcas';
// const urlDelete = `http://localhost:4000/api/categorias/${id}`;

const CrearMarca = () => {

    const[descripcion, setDescripcion]= useState('');
    const redirect = useNavigate();

    const store = async(e) =>{
        e.preventDefault();
          if ( !descripcion ) {
      alert("Por favor, completa el  campo requerido");
      return;
    }
        await axios.post(url, {
            Descripcion: descripcion
        });
        redirect('/marcas');
    }

  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Añadir Nueva Marca</div>
                    <div className="card-body">
                        <form onSubmit={store}>
                            
                            <label>Nombre de la Marca: </label>
                            <input type='text' id='descripcion' maxLength='150' 
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

export default CrearMarca;
