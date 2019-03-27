import { ValidationHelper, ValidationPattern } from 'src/app/helpers/validation-helper';

export class Car {
  private _name: string;
  private _mileage: number;
  private _fuel: number;
  private _tankCapacity: number;
  private _fuelPerKilometer: number;
  private _features: Array<string> = [];

  constructor(values: {
    name: string,
    mileage: number,
    fuel: number,
    tankCapacity: number,
    fuelPerKilometer: number,
    features?: Array<string>
  }) {
    this._name = values.name;
    this._mileage = values.mileage;
    this._fuel = values.fuel;
    this._tankCapacity = values.tankCapacity;
    this._fuelPerKilometer = values.fuelPerKilometer;
    this._features = values.features;

    ValidationHelper.validateNumberValue(values.mileage, "mileage", ValidationPattern.NonNegative);
    ValidationHelper.validateNumberValue(values.fuel, "fuel", ValidationPattern.NonNegative);
    ValidationHelper.validateNumberValue(values.tankCapacity, "tank capacity", ValidationPattern.Positive);
    ValidationHelper.validateNumberValue(values.fuelPerKilometer, "fuel per kilometre", ValidationPattern.Positive);

    if (values.fuel > values.tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");
  }

  public drive(distance: number): void {
    ValidationHelper.validateNumberValue(distance, "distance", ValidationPattern.Positive);
    const fuelSpent = Math.min(this._fuelPerKilometer * distance, this._fuel);
    this._fuel -= fuelSpent;
    this._mileage += fuelSpent / this._fuelPerKilometer;

    if (this.isEmptyTank) console.log("You need to refuel.");
  }

  public refuel(fuel: number): void {
    ValidationHelper.validateNumberValue(fuel, "quantity", ValidationPattern.Positive);

    if (this._fuel + fuel > this._tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");

    this._fuel += fuel;
  }

  public get name() { return this._name; }

  public get mileage() { return this._mileage; }

  public get fuel() { return this._fuel; }

  public get isEmptyTank() { return this.fuel <= 0.001; }

  public get tankCapacity() { return this._tankCapacity; }

  public get fuelPerKilometer() { return this._fuelPerKilometer; }

  public get features() { return this._features; }
}
