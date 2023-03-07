import { OrderEntity } from '../../database/entity/order.entity';
import { SubscriptionEntity } from '../../database/entity/subscription.entity';
import { SubscriptionRepository } from '../../database/repository/subscription.repository';
import { AddressRepository } from '../../database/repository/address.repository';
import { OrderRepository } from '../../database/repository/order.repository';
import { StripeService } from '../../stripe/stripe.service';
import { Logger } from '@nestjs/common';

export class CreateOrderHelper {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly addressRepository: AddressRepository,
    private readonly orderRepository: OrderRepository,
    private readonly stripeService: StripeService,
    private readonly logger: Logger,
  ) {}

  async createOrder(subscription: SubscriptionEntity) {
    const order = new OrderEntity();
    order.user = subscription.user;
    order.address = await this.addressRepository.getActiveAddressOfAUser(
      subscription.user,
    );
    order.subscription = subscription;
    await this.orderRepository
      .createOrder(order)
      .then(() => {
        this.stripeService
          .intentPayment(order.subscription)
          .then(() => {
            order.isSuccessful = true;
          })
          .catch((err) => {
            order.isSuccessful = false;
            this.logger.log(err);
          });
      })
      .catch((err) => {
        order.isSuccessful = false;
        this.logger.log(err);
      });
    await this.orderRepository.createOrder(order).catch((err) => {
      this.logger.log(err);
    });
    if (order.isSuccessful) {
      await this.updateSubscription();
    }
  }

  async updateSubscription() {
    /*
      TODO: CREATE FUNC ON REPO FIRSTLY
     */
  }
}
