import { getConnection } from "../DataBase/database";

const getCategorias = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM categorias");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getCategoria= async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM categorias WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addCategoria = async (req, res) => {
    try {
        const { Id, Descripcion } = req.body;

        // if (name === undefined || programmers === undefined) {
        //     res.status(400).json({ message: "Bad Request. Please fill all field." });
        // }

        const categoria  = { Id, Descripcion };
        const connection = await getConnection();
        await connection.query("INSERT INTO categorias SET ?", categoria);
        res.json({ message: "La Categoria fue agregada exitosamente!!" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateCategoria= async (req, res) => {
    try {
        const { id } = req.params;
        const {  Descripcion } = req.body;

        // if (id === undefined || name === undefined || programmers === undefined) {
        //     res.status(400).json({ message: "Bad Request. Please fill all field." });
        // }

        const categoria = {  Descripcion };
        const connection = await getConnection();
        const result = await connection.query("UPDATE categorias SET ? WHERE id = ?", [categoria, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categorias WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getCategorias,
    getCategoria,
    addCategoria,
    updateCategoria,
    deleteCategoria
};