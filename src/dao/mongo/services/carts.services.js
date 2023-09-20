import ProductModel from "../models/products.model.js"
import CartsModel from "../models/carts.model.js"
import UserModel from "../models/users.model.js"
import jwt from "jsonwebtoken"
import Config from "../../../config/config.js"

const adminArray = []
class cartsServices {
    constructor() { }

    static getCarts = async (res) => {
        try {
            let carrito = await CartsModel.find()

            res.status(200).json({ message: `TODOS LOS CARRITOS`, carritos: carrito })
        }
        catch (error) {
            res.sendServerError(error)
        }

    }
    static getCartById = async (cid, res) => {


        try {
            const carrito = await CartsModel.findById(cid)

            if (carrito === null) {
                res.status(404).json({ message: `Not Found` })
            } else {
                res.status(200).json({ message: `CARRITO N° ${cid}`, products: carrito.products })
            }
        }

        catch (error) {
            res.sendServerError(error)
        }

    }
    static addCart = async (token, res) => {

        try {

            const cart = new CartsModel()
            await cart.save()

            const userToken = jwt.verify(token, Config.COOKIE_KEY)

            if (userToken.email === Config.ADMIN_EMAIL) {
                const admin = {
                    email: userToken.email,
                    role: userToken.role,
                    cart: cart._id
                }
                adminArray.push(admin)
            } else {
                const user = await UserModel.findOne({ "email": userToken.email })
                user.cart = cart._id
                user.save()
            }

            res.status(200).json({ message: `CARRITO CREADO ID: ${cart._id}`, id: cart._id })

        }
        catch (error) {
            res.sendServerError(error)
        }
    }
    static addProductToCart = async (cid, pid, res) => {


        try {

            let carrito = await CartsModel.findOne({ _id: cid })

            let producto = await ProductModel.findOne({ _id: pid })

            if (carrito === null) {
                return res.status(404).json({ error: "Cart Not Found" })
            } else if (carrito === null || producto === null) {
                return res.status(404).json({ error: "Product Not Found" })
            }

            const productIndex = carrito.products.findIndex(e => e.product._id.equals(producto._id))

            if (productIndex === - 1) {
                carrito.products.push({ product: pid, quantity: 1 })
            } else {
                carrito.products[productIndex].quantity++
            }

            await CartsModel.updateOne({ _id: cid }, carrito)

            const actualizado = await CartsModel.findById(cid)

            res.status(200).json({ message: `Carrito actualizado`, data: actualizado })

        }
        catch (error) {
            res.sendServerError(error)
        }
    }
    static deleteCart = async (cid, res) => {

        try {
            const eliminado = await CartsModel.deleteOne({ _id: cid })

            if (eliminado.deletedCount) {
                res.status(200).json({ message: `CARRITO N° ${cid} ELIMINADO` })
            } else {
                res.status(404).json({ message: `Not Found` })
            }
        }

        catch (error) {
            res.sendServerError(error)
        }

    }
    static deleteAllProductsFromCart = async (cid, res) => {

        try {
            const carrito = await CartsModel.updateOne({ _id: cid }, { products: [] })

            carrito.matchedCount === 0
                ?
                res.status(404).json({ message: `Not Found` })
                :
                res.status(200).json({ message: `CARRITO N° ${cid} VACIO` })
        }

        catch (error) {
            res.sendServerError(error)
        }

    }
    static deleteProductsFromCart = async (cid, pid, res) => {

        try {
            const carrito = await CartsModel.findById(cid)

            if (carrito === null) {
                return res.status(404).json({ error: "Not Found" })
            }
            const productIndex = carrito.products.findIndex((e) => e.product._id.equals(pid))

            if (productIndex === -1) {
                return res.status(404).json({ error: "Not Found" })
            }

            carrito.products.splice(productIndex, 1)

            await CartsModel.updateOne({ _id: cid }, carrito, { new: true })

            res.status(200).json({ message: `PRODUCTO ID: ${pid} ELIMINADO DEL CARRITO` })

        }

        catch (error) {
            res.sendServerError(error)
        }

    }
    static updateQuantity = async (cid, pid, quantity, res) => {

        try {

            const carrito = await CartsModel.findById(cid)

            if (carrito === null) {
                return res.status(404).json({ error: "Cart Not Found" })
            }

            const productIndex = carrito.products.findIndex((e) => e.product._id.equals(pid))

            if (productIndex === -1) {
                return res.status(404).json({ error: "Product Not Found" })
            }

            carrito.products[productIndex].quantity += Number(quantity)

            const actualizado = await CartsModel.updateOne({ _id: cid }, carrito)


            res.status(200).json({ message: `CANTIDAD ACTUALIZADA : ${quantity}`, data: actualizado })
        }

        catch (error) {
            res.sendServerError(error)
        }

    }
    static getCartByIdView = async (cid, res) => {

        try {
            const carrito = await CartsModel.findById(cid)

            if (!carrito) {
                res.status(404).json({ message: "Not Found" })
            }

            const products = carrito.products.map((e) => ({
                product: {
                    _id: e.product._id,
                    title: e.product.title,
                    description: e.product.description,
                    code: e.product.code,
                    price: e.product.price,
                    stock: e.product.stock,
                    category: e.product.category,
                    status: e.product.status,
                    thumbnails: e.product.thumbnails
                },
                quantity: e.quantity
            }))

            let status = true

            if (products.length <= 0) {
                status = false
            }

            const resolve = {
                status,
                _id: carrito._id,
                products
            }

            return resolve

        }
        catch (error) {
            res.sendServerError(error)
        }
    }

    static getUserCart = async (token, res) => {
        try {
            let user
            const userToken = jwt.verify(token, Config.COOKIE_KEY)
            if (userToken.email === Config.ADMIN_EMAIL) {
                user = adminArray[0]
            } else {
                user = await UserModel.findOne({ "email": userToken.email })
            }

            if (!user.cart) {
                res.status(404).json({ message: `Not Found` })
            } else {
                const carrito = await CartsModel.findOne({ "_id": user.cart._id })

                if (carrito === null) {
                    res.status(404).json({ message: `Not Found` })
                } else {
                    res.status(200).json({ cartId: carrito._id, carrito })
                }
            }

        }

        catch (error) {
            res.sendServerError(error)
        }

    }

}
export default cartsServices

