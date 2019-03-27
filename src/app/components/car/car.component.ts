import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Car } from './modules/car';
import { ValidationHelper } from 'src/app/helpers/validation-helper';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public cars: Array<Car> = [
    new Car({ name: "BMW", mileage: 100, fuel: 20, tankCapacity: 40, fuelPerKilometer: 0.08, features: ["Compfortable seats", "Nice design"] }),
    new Car({ name: "Volvo", mileage: 2000, fuel: 5, tankCapacity: 40, fuelPerKilometer: 0.05, features: ["Safety features"] })
  ];
  public isAddCarDialogVisible: boolean = false;
  public newCarForm: FormGroup;

  public currentCar: Car | null = null;
  public isActionDialogVisible: boolean = false;
  public actionForm: FormGroup;
  public actionName: string | null = null;
  public actionHeader: string | null = null;
  public actionLabel: string | null = null;

  constructor() { }

  public get nameTextBox() { return this.newCarForm.controls.nameTextBox; }
  public get mileageTextBox() { return this.newCarForm.controls.mileageTextBox; }
  public get fuelTextBox() { return this.newCarForm.controls.fuelTextBox; }
  public get tankCapacityTextBox() { return this.newCarForm.controls.tankCapacityTextBox; }
  public get fuelPerKilometerTextBox() { return this.newCarForm.controls.fuelPerKilometerTextBox; }
  public get featuresTextBox() { return this.newCarForm.controls.featuresTextBox; }

  public get quantityTextBox() { return this.actionForm.controls.quantityTextBox; }

  public get name() { return this.nameTextBox.value; }
  public get mileage() { return ValidationHelper.getNumericValue(this.mileageTextBox); }
  public get fuel() { return ValidationHelper.getNumericValue(this.fuelTextBox); }
  public get tankCapacity() { return ValidationHelper.getNumericValue(this.tankCapacityTextBox); }
  public get fuelPerKilometer() { return ValidationHelper.getNumericValue(this.fuelPerKilometerTextBox); }
  public get features() { return (this.featuresTextBox.value || "").split(/\r?\n/); }

  public ngOnInit() {
    const nonNegativeNumberPattern: string = "^[0-9]+(\.[0-9]+)?$";
    const positiveNumberPattern: string = "^[1-9][0-9]*(\.[0-9]+)?$";
    this.newCarForm = new FormGroup({
      nameTextBox: new FormControl(null, [Validators.required]),
      mileageTextBox: new FormControl(null, [Validators.required, Validators.pattern(nonNegativeNumberPattern)]),
      fuelTextBox: new FormControl(null, [Validators.required, Validators.pattern(nonNegativeNumberPattern)]),
      tankCapacityTextBox: new FormControl(null, [Validators.required, Validators.pattern(positiveNumberPattern)]),
      fuelPerKilometerTextBox: new FormControl(null, [Validators.required, Validators.pattern(positiveNumberPattern)]),
      featuresTextBox: new FormControl()
    }, { validators: this.notMoreThanControlValue });

    this.actionForm = new FormGroup({
      quantityTextBox: new FormControl(null, [Validators.required, Validators.pattern(positiveNumberPattern)])
    });
  }

  public notMoreThanControlValue(group: FormGroup) {
    const fuelTextBox = group.controls.fuelTextBox;
    const tankCapacityTextBox = group.controls.tankCapacityTextBox;

    if (fuelTextBox.invalid) { return null; }

    if (tankCapacityTextBox.invalid) { return null; }

    var isInvalid = ValidationHelper.getNumericValue(fuelTextBox) > ValidationHelper.getNumericValue(tankCapacityTextBox);
    var errorObject = isInvalid ? { notMoreThanTankCapacity: true } : null;
    return errorObject;
  }

  public openAddCarDialog() { this.isAddCarDialogVisible = true; }

  public closeAddCarDialog() { this.isAddCarDialogVisible = false; }

  public addCar() {
    this.cars.push(new Car({
      name: this.name, mileage: this.mileage, fuel: this.fuel, tankCapacity: this.tankCapacity, fuelPerKilometer: this.fuelPerKilometer,
      features: this.features
    }));
    this.isAddCarDialogVisible = false;
    this.newCarForm.reset();
  }

  public drive(car: Car) {
    this.isActionDialogVisible = true;
    this.actionName = "DRIVE";
    this.actionHeader = "Driving car";
    this.actionLabel = "Distance, km";
    this.currentCar = car;
  }

  public refuel(car: Car) {
    this.isActionDialogVisible = true;
    this.actionName = "REFUEL";
    this.actionHeader = "Refueling car";
    this.actionLabel = "Fuel, liters";
    this.currentCar = car;
  }

  public closeActionDialog() {
    this.isActionDialogVisible = false;
    this.actionName = null;
    this.actionHeader = null;
    this.actionLabel = null;
    this.currentCar = null;
    this.actionForm.reset();
  }

  public permormAction() {
    const quantity = parseFloat(this.quantityTextBox.value);

    switch (this.actionName) {
      case "DRIVE":
        this.currentCar.drive(quantity);
        break;

      case "REFUEL":
        this.currentCar.refuel(quantity);
        break;

      default:
        throw new Error("Unknown action type.");
    }
    this.closeActionDialog();
  }
}
