import { getConnection } from "../DataBase/database";

const getArticulos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("select art.Id ,art.Codigo, art.Nombre, art.Descripcion,art.Precio,art.ImagenUrl, mar.descripcion as Marca,cat.descripcion as Categoria  from Articulos as art inner join MARCAS as  mar on   art.Fk_IdMarca=mar.Id  inner join categorias as cat on art.Fk_IdCategoria=cat.Id;");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getArticulo= async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("select art.Id ,art.Codigo, art.Nombre, art.Descripcion,art.Precio,art.ImagenUrl, mar.descripcion as Marca,cat.descripcion as Categoria,mar.Id as IdMarca, cat.Id as IdCategoria  from Articulos as art inner join MARCAS as  mar on   art.Fk_IdMarca=mar.Id inner join categorias as cat on art.Fk_IdCategoria=cat.Id where art.id=?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addArticulo = async (req, res) => {
    try {
        const {Codigo,Nombre,Descripcion,Precio,ImagenUrl,Fk_IdMarca,Fk_IdCategoria } = req.body;


        const articulo = {Codigo,Nombre,Descripcion,Precio,ImagenUrl,Fk_IdMarca,Fk_IdCategoria };
        const connection = await getConnection();
        await connection.query("INSERT INTO articulos SET ?", articulo);
        res.json({ message: "Articulo agregado exitosamente!!" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateArticulo= async (req, res) => {
    try {
        const { id } = req.params;
        const {Codigo,Nombre,Descripcion,Precio,ImagenUrl,Fk_IdMarca,Fk_IdCategoria } = req.body;


        const articulo = {Codigo,Nombre,Descripcion,Precio,ImagenUrl,Fk_IdMarca,Fk_IdCategoria };
        const connection = await getConnection();
        const result = await connection.query("UPDATE articulos SET ? WHERE id = ?", [articulo, id]);
        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM articulos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getArticulos,
    getArticulo,
    addArticulo,
    updateArticulo,
    deleteArticulo
};