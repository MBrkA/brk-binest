export class CreateAddressRequestDto {
  userId: number;
  country: string;
  city: string;
  district?: string;
  neighbourhood: string;
  street: string;
  apartment?: string;
  buildingNo: number;
  floor?: number;
  doorNo: number;
  zipcode: string;
}
