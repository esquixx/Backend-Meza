
class ProductManager {
    constructor() { 
      this.getProducts = []
}

addProduct = (objeto) => {
     const id = this.getNextID()
     const {title, descripcion, code, price, thumbnail, stock} = objeto

     if(!title || !descripcion) return
     
     if (this.getProducts.some(product => product.code === code)){

        console.log("encontro un code en la DB. Detener Funcion");
        return
     }
     this.getProducts.push({

        title,
        descripcion,
        code,
        price,
        thumbnail,
        stock
     })
}
    getProductByID = ( code ) => {
        const product = this.getProducts.find( p => p.code === code )
        if ( product ) return product
        else console.error("Not Found)");
    }

    getNextID = () => {
        const count = this.getProducts.length
        if( count === 0 ) return 1
        const lastArticle = this.getProducts[ count - 1 ]
        return lastArticle.id + 1
    }

}

const productManager = new ProductManager()

const productToAdd = {
    id: 1,
    title: "Monitor",
    descripcion: "de 24 pulgadas",
    code: "104",
    price: 80000,
    thumbnail: "https://www.shutterstock.com/shutterstock/photos/1013448724/display_1500/stock-photo-personal-computer-with-mobile-application-design-showing-on-the-monitor-stands-on-the-office-desk-1013448724.jpg",
    stock: 10
}
productManager.addProduct(productToAdd)

productManager.addProduct({
    title: "gabinete",
    descripcion: "gabinete de pc",
    code: "102",
    price: 150000,
    thumbnail: "https://www.shutterstock.com/shutterstock/photos/1831856260/display_1500/stock-photo-gaming-pc-with-rgb-led-lights-and-big-fans-on-the-front-computer-assembled-with-hardware-components-1831856260.jpg",
    stock: 10
})

console.log(productManager);