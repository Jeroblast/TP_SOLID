export class addProductToCartService{

    private maxProductsInOrder = 10

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly orderRepository: OrderRepository,
    ) {
    }


    async addProductToCart(productId: number, orderId: number, productQuantity: number){


        const order = await this.getOrderFromDb(orderId);
        const product = await this.getProductFromDb(productId);
        
    
        if (productQuantity > this.maxProductsInOrder) {
            throw new Exception(ExceptionTypeEnum.BadRequest, 'You can not order more than ${this.maxProductsInOrder} products');
        }
    
        if (product.quantityMax > productQuantity) {
            throw new Exception(ExceptionTypeEnum.BadRequest, 'Not enough products in stock');
        }
    
        return await this.saveProductInOrder(product, productQuantity, order);
    }

    private async getProductFromDb(productId: number): Product {
        const product = await this.productRepository.find({id: productId});

        if (!product) {
            throw new Exception(ExceptionTypeEnum.NotFound,'Product not found');
        }

        return product;
    }

    private async getOrderFromDb(orderId: number): Order {
        const order = await this.orderRepository.find({id: orderId});

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, 'Order not found');
        }
    }
    private async saveProductInOrder(productQuantity: number, product: Product, order: Order): Promise<Order> {
        product.quantityMax -= productQuantity;
        order.products.push(product);
        return await this.orderRepository.save(order);
       
    }
}