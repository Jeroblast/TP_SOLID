import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/discount-calculator.interface';

export class DiscountEmailByJeanPierreService implements DiscountEmailServiceInterface {

  sendEmail(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      console.log('Sending email to Jean Pierre');
    }
  }
}