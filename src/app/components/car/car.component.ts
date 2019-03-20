import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from './modules/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public cars: Array<Car> = [new Car("BMW", 100, 20, 40, 0.08, ["Compfortable seats", "Nice design"]), new Car("Volvo", 2000, 5, 40, 0.05, ["Safety features"])];
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

  public ngOnInit() {
    const numberPattern: string = "^[0-9]+(\.[0-9]+)?$";
    this.newCarForm = new FormGroup({
      nameTextBox: new FormControl(null, [Validators.required]),
      mileageTextBox: new FormControl(null, [Validators.required, Validators.pattern(numberPattern)]),
      fuelTextBox: new FormControl(null, [Validators.required, Validators.pattern(numberPattern)]),
      tankCapacityTextBox: new FormControl(null, [Validators.required, Validators.pattern(numberPattern)]),
      fuelPerKilometerTextBox: new FormControl(null, [Validators.required, Validators.pattern(numberPattern)]),
      featuresTextBox: new FormControl()
    });

    this.actionForm = new FormGroup({
      quantityTextBox: new FormControl(null, [Validators.required, Validators.pattern(numberPattern)])
    });
  }

  public openAddCarDialog() { this.isAddCarDialogVisible = true; }

  public closeAddCarDialog() { this.isAddCarDialogVisible = false; }

  public addCar() {
    this.cars.push(new Car(this.nameTextBox.value, parseFloat(this.mileageTextBox.value), parseFloat(this.fuelTextBox.value),
      parseFloat(this.tankCapacityTextBox.value), parseFloat(this.fuelPerKilometerTextBox.value), (this.featuresTextBox.value || "").split(/\r?\n/)));
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
