import express from 'express'
import ProductManager from './managers/ProductManager.js'

const PORT = 8080
const productManager = new ProductManager()
const app = express()

app.get('/products', async (req,res) =>{
    try{
        const limit = parseInt(req.query?.limit)
        const products = await productManager.getProducts(limit)
        res.send(products)

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }
})

app.get('/products/:id', async (req,res) => {
    try{
        const id = parseInt(req.params.id)
        const producto = await productManager.getProductById(id)
        res.send(producto)
    } catch (err) {
        res.status(500).send("Error al obtener el producto: " + err)
    }
})

app.listen(PORT, ()=> console.log("server corriendo en el puerto: " + PORT))