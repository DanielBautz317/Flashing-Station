import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddComponent } from 'src/app/_dialog/add/add.component';
import { ConfirmDeleteComponent } from 'src/app/_dialog/confirm-delete/confirm-delete.component';
import { Device } from 'src/app/_interface/device';

@Component({
  selector: 'app-qipcheckview',
  templateUrl: './qipcheckview.component.html',
  styleUrls: ['./qipcheckview.component.scss']
})
export class QipcheckviewComponent implements OnInit {

  form: FormGroup;
  description: string;
  device: Device;
  devices: Device[];
  resultText:string;

  constructor(private dialog: MatDialog) {
    this.devices = [{ hostname: "test", ipadress: "123456" }, { hostname: "test2", ipadress: "lalalalal" }];
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Add-Dialog'
    };
    const dialogRef = this.dialog.open(AddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.devices.push(data);
        }
        else{
          console.log("Nothing added");
        } 
         }
    );
    console.log(this.devices)
  }


  ngOnInit(): void {
  }

  deleteDevice(device: Device): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Add-Dialog'
    };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data === true){
          this.devices.splice(this.devices.indexOf(device), 1);
        }
        else{
          console.log("Nothing deleted");
        } 
         }
    );
  }
  startQipCheck():void{
    console.log("QIP Check started.");
    this.resultText = "Insert outcome of QIP-Check here";
  }

}
