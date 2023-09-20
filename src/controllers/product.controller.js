import productsServices from "../dao/mongo/services/products.services.js"

export const getProducts = async (req, res) => {
    let { limit = 10, page = 1, sort, query } = req.query
    return productsServices.getProducts(limit, page, sort, query, req, res)
}
export const getProductById = async (req, res) => {
    const { pid } = req.params
    return productsServices.getProductById(pid, res)
}
export const addProduct = async (req, res) => {
    const { id, title, description, code, price, status, stock, category, thumbnails } = req.body;
    return productsServices.addProduct(id, title, description, code, price, status, category, thumbnails, res)
}
export const deleteProduct = async (req, res) => {
    const { pid } = req.params
    return productsServices.deleteProduct(pid, res)
}
export const updateProduct = async (req, res) => {
    const { pid } = req.params
    const body = req.body
    return productsServices.updateProduct(pid, body, res)
}
export const getProductsView = async (req, res) => {
    let { limit = 10, page = 1, sort, query } = req.query
    return productsServices.getProductsView(limit, page, sort, query, req, res)
}


