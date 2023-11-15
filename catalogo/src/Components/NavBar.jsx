import { Link } from "react-router-dom";

function NavBar() {
    return (  
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Bienvenido al catalogo de la tienda</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/productos' className="nav-link fs-4"> Ir a Productos</Link>
        </li>
        <li className="nav-item">
          <Link to='/marcas' className="nav-link fs-4">Ir a Marcas</Link>
        </li>
        <li className="nav-item">
            <Link to='/categorias' className="nav-link fs-4">Ir a Categorias</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    );
}

export default NavBar;