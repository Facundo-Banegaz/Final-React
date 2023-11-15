import { getConnection } from "../DataBase/database";

const getMarcas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM marcas");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getMarca= async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM marcas WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addMarca= async (req, res) => {
    try {
        const { Id, Descripcion} = req.body;

        // if (name === undefined || programmers === undefined) {
        //     res.status(400).json({ message: "Bad Request. Please fill all field." });
        // }

        const marca = { Id, Descripcion};
        const connection = await getConnection();
        await connection.query("INSERT INTO marcas SET ?", marca);
        res.json({ message: "La Marca fue agregada exitosamente!!" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateMarca= async (req, res) => {
    try {
        const { id } = req.params;
        const {  Descripcion} = req.body;

        // if (id === undefined || name === undefined || programmers === undefined) {
        //     res.status(400).json({ message: "Bad Request. Please fill all field." });
        // }

        const marca = { Descripcion};
        const connection = await getConnection();
        const result = await connection.query("UPDATE marcas SET ? WHERE id = ?", [marca, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteMarca = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM marcas WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getMarcas,
    getMarca,
    addMarca,
    updateMarca,
    deleteMarca
};