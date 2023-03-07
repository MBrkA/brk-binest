import { CurrencyType } from '../../database/enum/currency.enum';

export class CreateSubscriptionRequestDto {
  userId: number;
  currency: CurrencyType;
  amount: number;
  frequency: Date;
  stripeCardId: number;
}
