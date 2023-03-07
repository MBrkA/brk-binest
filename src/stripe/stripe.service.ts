import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SubscriptionEntity } from '../database/entity/subscription.entity';
import { CurrencyType } from '../database/enum/currency.enum';

@Injectable()
export class StripeService {
  private readonly stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async intentPayment(subscription: SubscriptionEntity) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: subscription.amount,
        currency: CurrencyType[subscription.currency].toLowerCase(),
        payment_method_types: ['card'],
      });
      console.log(paymentIntent);
    } catch (error) {
      console.log('Error creating payment intent:', error.message);
    }
  }
}
