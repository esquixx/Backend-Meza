import fs from 'fs/promises';

export default class ProductManager {
    constructor() {
        this.path = "./src/productos/productos.json";
        this.products = [];
    }

    async validateCode(code) {
        const data = await this.loadProducts();
        return data.some((producto) => producto.code === code);
    }

    async getProducts(limit) {
        try {
            const data = await this.loadProducts();
            const productosFiltrados = limit ? data.slice(0, limit) : data;
            return productosFiltrados;
        } catch (err) {
            throw err; // Lanza una excepción en lugar de devolver el error
        }
    }

    async addProduct(producto) {
        try {
            const data = await this.loadProducts();
            
            if (data.some((p) => p.code === producto.code)) {
                throw new Error("El producto ya existe");
            }

            // Validación de campos requeridos
            if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                throw new Error("Faltan datos obligatorios");
            }

            const newProduct = {
                id: data.length + 1,
                ...producto,
            };

            data.push(newProduct);
            await this.saveProducts(data);
            return "Se creó el producto correctamente";
        } catch (err) {
            throw err;
        }
    }

    async getProductById(id) {
        const data = await this.loadProducts();
        const producto = data.find((product) => product.id === id);

        if (producto) {
            return producto;
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async updateProduct(id, update) {
        try {
            const data = await this.loadProducts();
            const productIndex = data.findIndex((product) => product.id === id);

            if (productIndex === -1) {
                throw new Error("Producto no encontrado");
            }

            data[productIndex] = { ...data[productIndex], ...update };
            await this.saveProducts(data);
            return "Se modificó el producto correctamente";
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(id) {
        try {
            const data = await this.loadProducts();
            const filteredProducts = data.filter((product) => product.id !== id);
            await this.saveProducts(filteredProducts);
            return "Se eliminó el producto correctamente";
        } catch (err) {
            throw err;
        }
    }

    async loadProducts() {
        try {
            if (!await fs.access(this.path)) {
                return this.products;
            }
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async saveProducts(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, '\t'));
    }
}
