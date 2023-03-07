import { CurrencyType } from '../../database/enum/currency.enum';
import { FrequencyType } from '../../database/enum/frequency.enum';

export class CreateSubscriptionRequestDto {
  userId: number;
  currency: CurrencyType;
  amount: number;
  frequency: FrequencyType;
  stripeCardId: number;
}
