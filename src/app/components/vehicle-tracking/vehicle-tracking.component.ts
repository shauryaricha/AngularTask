import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinct, map, repeat, take, tap } from 'rxjs/operators'
import { VechicleTrackingService } from 'src/app/service/vechicleTracking.service';


declare var H: any;
@Component({
  selector: 'app-vehicle-tracking',
  templateUrl: './vehicle-tracking.component.html',
  styleUrls: ['./vehicle-tracking.component.css'],
  providers: [VechicleTrackingService]
})
export class VehicleTrackingComponent implements OnInit {

  



@ViewChild("map_canvas", { static: true }) public mapElement: ElementRef;  
  
public lat: any = '22.5726';  
public lng: any = '88.3639';  

public width: any = '1000px';  
public height: any = '600px'; 
public country = [];

private platform: any;
public activeTab = 'invoiceTab';

private map: any;
  constructor(protected tracking: VechicleTrackingService) { }

  ngOnInit() {
    this.tracking.getCompanyDetails().subscribe();
  }

  changTab(tabName) {
    this.activeTab = tabName;
  }
  

}
