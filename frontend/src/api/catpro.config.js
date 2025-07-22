import api from "./config"

// Categoría -> Crear, Actualizar, Eliminar, Ver
export const getCategory = () => api.get(`product-category/api/category/categorys/`)

// Producto -> Crear, Actualizar, Eliminar, Ver
export const getProduct = () => api.get(`product-category/api/product/products/`)