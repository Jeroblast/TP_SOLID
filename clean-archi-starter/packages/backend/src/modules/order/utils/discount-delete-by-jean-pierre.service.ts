import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/discount-calculator.interface';

export class DiscountCalculatorByJeanPierreService implements DiscountDeleteServiceInterface {

  deleteDiscount(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      order.discount = 0;
    }
  }
}