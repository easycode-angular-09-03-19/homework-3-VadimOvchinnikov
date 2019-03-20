import { validateNumberValue } from 'src/app/helpers/helper';

export class Car {
  constructor(private _name: string, private _mileage: number, private _fuel: number, private _tankCapacity: number, private _fuelPerKilometer: number, private _features: Array<string>) {
    validateNumberValue(_mileage, "mileage");
    validateNumberValue(_fuel, "fuel");
    validateNumberValue(_tankCapacity, "tank capacity");
    validateNumberValue(_fuelPerKilometer, "fuel per kilometre");

    if (_fuel > _tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");
  }

  public drive(distance: number): void {
    validateNumberValue(distance, "distance");
    const fuelSpent = Math.min(this._fuelPerKilometer * distance, this._fuel);
    this._fuel -= fuelSpent;
    this._mileage += fuelSpent / this._fuelPerKilometer;

    if (this.isEmptyTank) console.log("You need to refuel.");
  }

  public refuel(fuel: number): void {
    validateNumberValue(fuel, "quantity");

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
