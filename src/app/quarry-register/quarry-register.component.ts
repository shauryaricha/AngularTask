import { Component, OnInit } from '@angular/core';
import { map, repeat, take, tap } from 'rxjs/operators';
import { SurveyLocation } from '../constants/quarry-register';
import { IDistrict, IQuarryRegister, ISurveyDetail, ITaluka, IVillageCity } from '../interfaces/quarry-register';
import { QuarryRegisterAPiService } from '../service/quarry-register.service';

@Component({
  selector: 'app-quarry-register',
  templateUrl: './quarry-register.component.html',
  styleUrls: ['./quarry-register.component.css']
})
export class QuarryRegisterComponent implements OnInit {
  surveyTaluka: number;
  surveyVillage: number;
  surveyCity: number;
  surveyCategory: number= 0;
  surveyDistrict: number;
  surveyLocation: string;
  surveyNumber: string;

  surveyDetails: ISurveyDetail[] = [];

    taluka: number;
    village: number;
    city: number;
    category: number= 0;
    district: number;
    districts: IDistrict[];
    talukas: ITaluka[];
    villages: IVillageCity[];
    cities: IVillageCity[];
    surveyTalukas: ITaluka[];
    surveyVillages: IVillageCity[];
    surveyCities: IVillageCity[];
quarryRegisters: IQuarryRegister[] = [];
quarryRegisterTotalPages:number;
quarryRegisterCurrentPage: number;

surveyEditMode: boolean;


  constructor(private quarryRegisterAPiService: QuarryRegisterAPiService) { }

  

  onDistrictChange(districtId: number): void{
    this.surveyDistrict = districtId;
    this.quarryRegisterAPiService.getTalukasByUserIdDistrictId(3872, districtId).pipe(map(talukas => {
      this.talukas = talukas;
      this.surveyTalukas = talukas;
      if(talukas.length === 1){
        this.taluka = talukas[0].id;
        this.surveyTaluka = this.taluka;
      }
    })).subscribe();
  }

  onSurveyDistrictChange(districtId: number): void{
    this.quarryRegisterAPiService.getTalukasByUserIdDistrictId(3872, districtId).pipe(map(talukas => {
      this.surveyTalukas = talukas;
      if(talukas.length === 1){
        this.surveyTaluka = talukas[0].id;
      }
    })).subscribe();
  }

  onTalukaChange(talukaId: number): void{
      this.surveyTaluka = talukaId;
      this.village = undefined;
      this.city = undefined;
      this.surveyVillage = undefined;
      this.surveyCity = undefined;

      if(this.category === 0){
      this.quarryRegisterAPiService.getVillagesByCriteria(talukaId).pipe(map(villages => {
        this.villages = villages;
        this.surveyVillages = villages;
        if(villages.length === 1){
          this.village = villages[0].id;
          this.surveyVillage = this.village;    
        }
      })).subscribe();
    }
    else{
      this.quarryRegisterAPiService.getCitiesByTalukaId(talukaId).pipe(map(cities => {
        this.cities = cities;
        if(cities.length === 1){
          this.city = cities[0].id;
          this.surveyCity = this.city;
        }
      })).subscribe();
    }
  }

  onSurveyTalukaChange(talukaId: number): void{
    if(this.surveyCategory === 0){
      this.surveyVillage = undefined;
    this.quarryRegisterAPiService.getVillagesByCriteria(talukaId).pipe(map(villages => {
      this.surveyVillages = villages;
      if(villages.length === 1){
        this.surveyVillage = villages[0].id;
      }
    })).subscribe();
  }
  else{
    this.surveyCity = undefined;
    this.quarryRegisterAPiService.getCitiesByTalukaId(talukaId).pipe(map(cities => {
      this.surveyCities = cities;
      if(cities.length === 1){
        this.surveyCity = cities[0].id;
      }
    })).subscribe();
  }
}

addOrUpdateSurvey() {
  const surveyDistrict = this.districts.find(district => district.id == Number(this.surveyDistrict));
  const surveyTaluka = this.surveyTalukas.find(taluka => taluka.id == Number(this.surveyTaluka));
  const surveyVillageCity = this.surveyVillage ? this.surveyVillages.find(village => village.id == Number(this.surveyVillage)) : this.surveyCities.find(city => city.id == Number(this.surveyCity));
 
  const surveyDetail ={
    surveyLocation: this.surveyLocation,
    surveyLocationLabel: SurveyLocation[this.surveyLocation],
    surveyCategory: this.surveyCategory,
    surveyDistrict: this.surveyDistrict,
    surveyDistrictLabel: surveyDistrict.district,
    surveyTaluka: Number(this.surveyTaluka),
    surveyTalukaLabel: surveyTaluka.taluka,
    surveyVillageCity: this.surveyVillage ? Number(this.surveyVillage): Number(this.surveyCity),
    surveyVillageCityLabel: surveyVillageCity.name,
    surveyNumber: this.surveyNumber,
  }

if(this.surveyEditMode){
  this.surveyDetails[this.surveyEditIndex]= surveyDetail;
}
else{
  this.surveyDetails.push(surveyDetail);
}

  this.surveyEditMode = false;
  this.surveyNumber = '';
  this.surveyEditIndex = null;
}

deleteSurveyDetail(index){
  this.surveyDetails.splice(index, 1);
}

surveyEditIndex: number;
editSurveyDetail(index){
  this.surveyEditIndex = index;
  this.surveyEditMode = true;
  const surveyDetail = this.surveyDetails[index];

  this.surveyLocation = surveyDetail.surveyLocation;
  this.surveyCategory = surveyDetail.surveyCategory;
  this.surveyDistrict = surveyDetail.surveyDistrict;
  
  this.quarryRegisterAPiService.getTalukasByUserIdDistrictId(3872, this.surveyDistrict).pipe(map(talukas => {
    this.surveyTalukas = talukas;
    this.surveyTaluka = surveyDetail.surveyTaluka;

    if(surveyDetail.surveyCategory == 0){
      this.quarryRegisterAPiService.getVillagesByCriteria(this.surveyTaluka).pipe(map(villages => {
        this.surveyVillages = villages;
       this.surveyVillage = Number(surveyDetail.surveyVillageCity);
      })).subscribe();
    }
    else{
      this.quarryRegisterAPiService.getCitiesByTalukaId(this.surveyTaluka).pipe(map(cities => {
        this.surveyCities = cities;
       this.surveyCity = Number(surveyDetail.surveyVillageCity);
      })).subscribe();
    }
  })).subscribe();

  this.surveyNumber = surveyDetail.surveyNumber;
}

clearSurvey(){
  this.surveyEditMode = false;
  this.surveyNumber = '';
  this.surveyEditIndex = null;

}

getLatLong(){
   if(this.village){
     const village = this.villages.find(village => village.id == this.village);
      return `${village.latitude},${village.longitude}`;
   }
   else if(this.city){
    const city = this.cities.find(city => city.id == this.city);
    return `${city.latitude},${city.longitude}`;
   }
}

  ngOnInit() {
    this.quarryRegisterAPiService.getDistrictByUserIdStateId(3872, 1).pipe(map(districts => {
      this.districts = districts;

      if(districts.length === 1){  
        this.district = districts[0].id;
        this.onDistrictChange(this.district);
        }


        this.quarryRegisterAPiService.getQuarryRegisters(districts[0].id).pipe(map(response => {
          this.quarryRegisters = response.responseData1;
          this.quarryRegisterTotalPages = response.responseData2.totalPages;
          this.quarryRegisterCurrentPage = response.responseData2.pageNo;
        })).subscribe();
    })).subscribe();
  }
}     
