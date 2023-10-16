import {Controller, Post} from '@nestjs/common';
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";

@Controller('/order')
export default class ProductToCartAdder {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly orderRepository: OrderRepository,
        privatee readonly addProductToCart: addProductToCartService
    ) { }

    @Post()
    async addProductToCart(request: Request): Promise<Order> {

        const productId = request.body.productId;
        const productQuantity = request.body.productQuantity;
        const orderId = request.body.orderId;

        await this.productToCartAdder.addProductToCart(productId, productQuantity, orderId);
    }

}