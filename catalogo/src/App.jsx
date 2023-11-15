import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//home
import Home from './Components/Home';
//Detalle
import Detail from './Components/Detail';
// imports de articulos
import MostrarProductos from './Components/Producto/MostrarProductos';
import CrearProductos from './Components/Producto/CrearProductos';
import EditarProductos from './Components/Producto/EditarProductos';

//imports de categorias

import MostrarCategoria from './Components/Categoria/MostrarCategoria';
import CrearCategoria from './Components/Categoria/CrearCategoria';
import EditarCategoria from './Components/Categoria/EditarCategoria';

//import marcas

import MostrarMarca from './Components/Marca/MostrarMarca';
import CrearMarca from './Components/Marca/CrearMarca';
import EditarMarca from './Components/Marca/EditarMarca';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/detalle/:id' element={<Detail/>}></Route>

        <Route path='/productos' element={<MostrarProductos/>}></Route>
        <Route path='/crear-producto' element={<CrearProductos/>}></Route>
        <Route path='productos/editar/:id' element={<EditarProductos/>}></Route>

        <Route path='/categorias' element={<MostrarCategoria/>}></Route>
        <Route path='/create-categoria' element={<CrearCategoria />}></Route>
        <Route path='categorias/editar/:id' element={<EditarCategoria/>}></Route>

        <Route path='/marcas' element={<MostrarMarca/>}></Route>
        <Route path='/create-marca' element={<CrearMarca />}></Route>
        <Route path='marcas/editar/:id' element={<EditarMarca/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;

