import  {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
    const [products, setProducts] = useState([]);
    const { id } = useParams();

  const estilo = {
    color: 'blue',
    fontSize: '18px',
    border: '1px solid black',
    padding: '50px',
    maxWidth: "740px"
  };

    const getProducts = async() =>{
        const respuesta = await axios.get(`http://localhost:4000/api/articulos/${id}`);
        setProducts(respuesta.data);
    }
    useEffect(() => {
        getProducts();
    }, []);
    return ( 
      <div className="container mt-5">
        <div className="row justify-content-center">
          <h2 className="text-center">Estas en la Seccion Detalle</h2>
          {products.map((articulo) => (
                      <div className="card mb-3" style={estilo} key={articulo.Id}>
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img  className="card-img-top mx-auto" src={articulo.ImagenUrl} alt={articulo.Nombre} width={250}/>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                      <h5 className="card-title">Modelo: {articulo.Nombre}</h5>
                      <h5 className="card-title">Marca: {articulo.Marca}</h5>
                      <h5 className="card-title">Categoria: {articulo.Categoria}</h5>
                        <p className="card-text">Descripcion: {articulo.Descripcion}</p>
                      <p className="card-text">Precio: <small className="text-body-secondary">${new Intl.NumberFormat('es-ar').format(articulo.Precio)}</small></p>
                      <Link to='/' className="btn btn-success mt-3 fs-4">Volver</Link>
                              </div>
                            </div>
                          </div>
                    </div>
                            ))

          }
          </div>
        </div>
     );
}

export default Detail;