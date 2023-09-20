//import { ProductManager } from "../dao/memory/ProductManager.js";
import ProductModel from "../dao/mongo/models/products.model.js";

export default (io) => {
    let messages = []
    io.on("connection", async (socket) => {
        console.log("nueva conexion");

        // CHAT //
        socket.on("new-user", (data) => {
            socket.user = data.user
            socket.id = data.id
            socket.emit("user-dom", socket.user)
        })

        socket.on("message", (data) => {
            messages.push(data)
            io.emit("message_logs", messages)
        })


        // REAL TIME PRODUCTS IN DB

        const cargarDatos = async () => {
            const productosDB = await ProductModel.find()
            socket.emit("lista_productos_db", productosDB)
        }
        cargarDatos()

        socket.on("agregar_producto_db", async (data) => {
            const { id, title, description, code, price, status, stock, category, thumbnails } = data;
            const statusProduct = { incomplete: false, repeated: false }

            if (!title || !description || !code || !price || !stock || !category) {
                statusProduct.incomplete = true
                socket.emit("action", statusProduct)
                return
            }

            if (!thumbnails) {
                data.thumbnail = "";
            }
            if (status === undefined) {
                data.status = true
            }

            const repetedCode = await ProductModel.findOne({ "code": data.code })

            if (repetedCode) {
                statusProduct.repeated = true
                socket.emit("action", statusProduct)
                return
            }

            try {
                const product = {
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnails
                }

                socket.emit("action", statusProduct)
                await ProductModel.create(product)
                cargarDatos()

            }
            catch (err) {
                console.log(err);
            }
        })

        socket.on("eliminar_producto_db", async (data) => {
            let notFound = false
            try {

                const exist = await ProductModel.findOne({ "code": data })

                if (exist === null) {
                    notFound = true
                    socket.emit("action_delete", { notFound })
                } else {
                    socket.emit("action_delete", { notFound })
                    await ProductModel.findOneAndDelete({ "code": data })
                    cargarDatos()
                }

            }
            catch (e) {
                console.log(e);
            }
        })
    })
}