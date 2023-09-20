import cartsServices from "../dao/mongo/services/carts.services.js"

export const getCarts = async (req, res) => {
    return await cartsServices.getCarts(res)
}
export const getCartById = async (req, res) => {
    const { cid } = req.params
    return await cartsServices.getCartById(cid, res)
}
export const addCart = async (req, res) => {

    const token = req.cookies["coderCookieToken"];
    return await cartsServices.addCart(token, res)
}
export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params
    return await cartsServices.addProductToCart(cid, pid, res)
}
export const deleteCart = async (req, res) => {
    const { cid } = req.params
    return await cartsServices.deleteCart(cid, res)
}
export const deleteAllProductsFromCart = async (req, res) => {
    const { cid } = req.params
    return await cartsServices.deleteAllProductsFromCart(cid, res)
}
export const deleteProductsFromCart = async (req, res) => {
    const { cid, pid } = req.params
    return await cartsServices.deleteProductsFromCart(cid, pid, res)
}
export const updateQuantity = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    return await cartsServices.updateQuantity(cid, pid, quantity, res)
}
export const getCartByIdView = async (req, res) => {
    const { cid } = req.params
    return await cartsServices.getCartByIdView(cid, res)
}

export const getUserCart = async (req, res) => {
    const token = req.cookies["coderCookieToken"];
    return await cartsServices.getUserCart(token, res)
}





