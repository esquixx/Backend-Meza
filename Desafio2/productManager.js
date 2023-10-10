const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const productsLength = products.length;
        const { title, description, price, thumbnail, code, stock } = product;
        
        const newproduct = {
            id: productsLength > 0 ? products[productsLength - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        const productRepeat = products.some(prod => prod.code === code);
        const data = Object.values(newproduct).some(value => value === undefined || value === null);

        if (data) {
            return console.log("Valores incompletos, por favor llene todos los campos solicitados");
        }

        if (productRepeat) {
            return console.log('Este código de producto ya existe, por favor verifique');
        }

        products.push(newproduct);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        }
        catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            return this.products;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const search = products.find(product => product.id === id);

        if (!search) {
            console.log("Error: El producto que buscas no existe");
        } else {
            console.log(search);
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productForDeleteIndex = products.findIndex(product => product.id === id);

        if (productForDeleteIndex === -1) {
            return console.log("Error: El producto que buscas no existe");
        }

        try {
            products.splice(productForDeleteIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        }
        catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, prod) {
        const products = await this.getProducts();

        const productToUpdate = products.find(product => product.id == id);

        if (!productToUpdate) {
            return console.log("Error: El producto que deseas actualizar no existe");
        }

        productToUpdate.title = prod.title || productToUpdate.title;
        productToUpdate.description = prod.description || productToUpdate.description;
        productToUpdate.price = prod.price || productToUpdate.price;
        productToUpdate.thumbnail = prod.thumbnail ? [...productToUpdate.thumbnail, prod.thumbnail] : productToUpdate.thumbnail;
        productToUpdate.code = prod.code || productToUpdate.code;

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        }
        catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager('./products.json');

