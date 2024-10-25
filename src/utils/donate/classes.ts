export class PaymentMethodClass {
  constructor(
    public name: string,
    public value: string,
    public content?: string,
    public disabled?: boolean
  ) {}
}
