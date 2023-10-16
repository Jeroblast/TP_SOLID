import {Controller, Post} from '@nestjs/common';
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";

@Controller('/order')
export default class ProductToCartAdder {

    private maxProductsInOrder = 10;

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly orderRepository: OrderRepository,
    ) {
    }

    @Post()
    async addProductToCart(productId: number, productQuantity: number, orderId: number): Promise<Order> {

        const productId = request.body.productId;
        const productQuantity = request.body.productQuantity;
        const orderId = request.body.orderId;


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

    private async saveProductInOrder(productQuantity: number, product: Product, order: Order): Promise<Order> {
        product.quantityMax -= productQuantity;
        order.products.push(product);
        return await this.orderRepository.save(order);
    }

    private async getOrderFromDb(orderId: number): Order {
        const order = await this.orderRepository.find({id: orderId});

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, 'Order not found');
        }

        const email = new EmailTemplate();
        const emailContent = "<h1>Order created</h1>";
        const emailSubject = "Order created";
        const emailTo = "admin@supercommerce.com";
        const email.sendEmail(order);


        return order
    }

    private async getProductFromDb(productId: number): Product {
        const product = await this.productRepository.find({id: productId});

        if (!product) {
            throw new Exception(ExceptionTypeEnum.NotFound,'Product not found');
        }

        return product;
    }

}