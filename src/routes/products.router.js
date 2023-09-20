import Routes from "./router.js"
import { getProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js"

export default class ProductsRouter extends Routes {
    init() {
        this.get("/", ["USER", "USER_PREMIUM", "ADMIN"], getProducts)

        this.get("/:pid", ["USER", "USER_PREMIUM", "ADMIN"], getProductById)

        this.post("/", ["USER", "USER_PREMIUM", "ADMIN"], addProduct)

        this.delete("/:pid", ["USER", "USER_PREMIUM", "ADMIN"], deleteProduct)

        this.put("/:pid", ["USER", "USER_PREMIUM", "ADMIN"], updateProduct)
    }
}

