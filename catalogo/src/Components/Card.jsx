import { Link } from "react-router-dom";

function Card({ art }) {
  const estilo = {
    color: 'blue',
    fontSize: '18px',
    border: '1px solid black',
    padding: '10px',
    maxWidth: "540px"
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {
          art.map((articulo) => (
            <div className="col-md-6" key={articulo.Id}>
              <div className="card mb-3" style={estilo}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="card-img-top mx-auto" src={articulo.ImagenUrl} alt={articulo.Nombre} width={150} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Modelo: {articulo.Nombre}</h5>
                      <h5 className="card-title">Marca: {articulo.Marca}</h5>
                      <p className="card-text">Precio: <small className="text-body-secondary">${new Intl.NumberFormat('es-ar').format(articulo.Precio)}</small></p>
                      
                      <Link to={`detalle/${articulo.Id}`} className='btn btn-success'>Ver Detalle</Link>
                    </div>
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

export default Card;
