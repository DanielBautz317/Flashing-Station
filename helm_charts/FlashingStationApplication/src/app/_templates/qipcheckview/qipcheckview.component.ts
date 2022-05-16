import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { AddComponent } from 'src/app/_dialog/add/add.component';
import { ConfirmDeleteComponent } from 'src/app/_dialog/confirm-delete/confirm-delete.component';
import { Device } from 'src/app/_interface/device';
import { DataService } from 'src/app/_service/data.service';
import { Subscription } from 'rxjs';
import { Cache, CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { Content } from '@angular/compiler/src/render3/r3_ast';

const dataCache = new CacheContainer(new MemoryStorage())



@Component({
  selector: 'app-qipcheckview',
  templateUrl: './qipcheckview.component.html',
  styleUrls: ['./qipcheckview.component.scss']
})


export class QipcheckviewComponent implements OnInit {

  @Cache(dataCache, {isCachedForever:true})
  public async getDevicesFromCache(): Promise<Device[]> {
    console.log(dataCache)
    console.log('Devices: ' + this.devices)
    return this.devices;
  }
  public async addDeviceToCache(device: Device):Promise<void>{
    console.log('devices before add: '+ this.devices)
    this.devices.push(device);
    console.log('devices after add: '+ this.devices)
    console.log(dataCache)
  }
  public async deleteDeviceFromCache(device: Device):Promise<void>{
    this.devices.splice(this.devices.indexOf(device));
    console.log(dataCache)
  }


  form: FormGroup;
  description: string;
  device: Device;
  devices: Device[]=[];
  resultText:string;
  deletePossible:boolean =false;
  selectedOptions:Device[]=[];

  constructor(private dialog: MatDialog, public _dataService:DataService) {
    this.loadData();
    console.log(dataCache)
  }

  public loadData():void{
    
    //this._dataService.getDevice().subscribe(data=>this.devices)
    //this.getDevicesFromCache();
      this._dataService.getDevice().subscribe((data: Device[]) => {
         this.devices = data;
         console.log(this.devices)
       },() => {
         console.log(`%ERROR $(error.message)`)
      })

  }
  onNgModelChange($event: any) {
   console.log(this.selectedOptions)
   console.log($event)

   this.selectedOptions.forEach(device => {
     console.log(device.hostname+ ',' +device.ipadress)
   })
   console.log(this.selectedOptions.length)
   if(this.selectedOptions.length> 0){
    this.deletePossible = true;
    }
    else{
      this.deletePossible = false;
    }
    console.log(this.deletePossible)
  }

  // onSave = function(device){
  //   this._dataService.SaveDevice(device).subscribe(data=>{
  //     alert(data.data)
  //   })
  // }


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
          //this.onSave(data);
          //this.addDeviceToCache(data);
            this._dataService.postDevice(data).subscribe((data: Device)=> {
              this.devices.push(data);

            }, error =>{
              console.log(`${error.message}`)
            })

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

  deleteDevice(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Delete-Dialog'
    };
    this.selectedOptions.forEach(device =>{
      console.log(device.hostname + device.ipadress);
    })
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data === true){
          console.log(data)
          this.selectedOptions.forEach(device => {
            //this.deleteDeviceFromCache(device);
              this._dataService.deleteDevice(device).subscribe((data:Device)=>{
              }, error =>{
                console.log(`${error.message}`)
              })
          })
          this.devices = this.devices.filter(item => this.selectedOptions.indexOf(item) < 0);
          this.selectedOptions.forEach(device =>{
            console.log("Removing " +device.hostname + "from devices Array");
          })
          console.log("Array length: "+this.devices.length + " , Selection length:" + this.selectedOptions.length)
        }
        else{
          console.log("Nothing deleted");
        }
         }
    );
  }

  startQipCheck():void{
    console.log("QIP Check started.");
    this.resultText="";
    this.devices.forEach((device) => {this.resultText = this.resultText + "Hostname: " + device.hostname + "  Ip-Adress: "+ device.ipadress + '\r\n';})
  }
  selectAllElements():void{
    if(this.selectedOptions.length != this.devices.length){
      this.selectedOptions = this.devices;
      this.deletePossible =true;
    }
    else{
      this.selectedOptions = [];
      this.deletePossible=false;

    }
  }

}
