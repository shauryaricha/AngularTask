import { Component, OnInit } from '@angular/core';
import { distinct, map, repeat, take, tap } from 'rxjs/operators';
import { SurveyLocation } from '../constants/quarry-register';
import { IDistrict, IQuarryApiRequestModel, IQuarryRegisterRequestModel, IQuarryRegisterResponseModel, IQuarrySearchCriteria, ISurveyDetail, ITaluka, IVillageCity } from '../interfaces/quarry-register';
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

  
    districts: IDistrict[];
    talukas: ITaluka[];
    villages: IVillageCity[];
    cities: IVillageCity[];
    surveyTalukas: ITaluka[];
    surveyVillages: IVillageCity[];
    surveyCities: IVillageCity[];

quarryRegisters: IQuarryRegisterResponseModel[] = [];
quarryRegisterTotalPages:number;
quarryRegisterCurrentPage: number;

quarryRegister: IQuarryRegisterRequestModel = {} as IQuarryRegisterRequestModel;
surveyEditMode: boolean;



 quarrySearchCriteria: IQuarrySearchCriteria = {
  districtId: 0,
  pageNumber: 1,
  pagesize: 10,
  ownerShip: '',
  location: '',
  plotType: null,
  textSearch: ''
};

  constructor(private quarryRegisterAPiService: QuarryRegisterAPiService) { }

  searchQuarryRegisters() {
    this.quarryRegisterAPiService.getQuarryRegisters(this.quarrySearchCriteria).subscribe(res => {this.quarryRegisters = res.responseData1});
  }

  onDistrictChange(districtId: number): void{
    this.surveyDistrict = districtId;
    this.quarryRegisterAPiService.getTalukasByUserIdDistrictId(3872, districtId).pipe(map(talukas => {
      this.talukas = talukas;
      this.surveyTalukas = talukas;
      if(talukas.length === 1){
        this.quarryRegister.talukaId = talukas[0].id;
        this.surveyTaluka = this.quarryRegister.talukaId;
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
      this.quarryRegister.villageId = undefined;
      this.quarryRegister.cityId = undefined;
      this.surveyVillage = undefined;
      this.surveyCity = undefined;

      if(this.quarryRegister.category === 0){
      this.quarryRegisterAPiService.getVillagesByCriteria(talukaId).pipe(map(villages => {
        this.villages = villages;
        this.surveyVillages = villages;
        if(villages.length === 1){
          this.quarryRegister.villageId = villages[0].id;
          this.surveyVillage = this.quarryRegister.villageId;    
        }
      })).subscribe();
    }
    else{
      this.quarryRegisterAPiService.getCitiesByTalukaId(talukaId).pipe(map(cities => {
        this.cities = cities;
        if(cities.length === 1){
          this.quarryRegister.cityId = cities[0].id;
          this.surveyCity =  this.quarryRegister.cityId;
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
 
  const siteModel ={
    location: this.surveyLocation,
    category: this.surveyCategory,
    categoryName: '',
    districtId: this.surveyDistrict,
    district: surveyDistrict.district,
    talukaId: Number(this.surveyTaluka),
    taluka: surveyTaluka.taluka,
    censusId: this.surveyVillage ? Number(this.surveyVillage): Number(this.surveyCity),
    villageName: surveyVillageCity.name,
    surveyNo: this.surveyNumber,
    state: '',
    division: '',
    divisionId: 0,
    siteId: 0,
    stateId: 0
  }

if(this.surveyEditMode){
  this.quarryRegister.siteModels[this.surveyEditIndex]= siteModel;
}
else{
  this.quarryRegister.siteModels.push(siteModel);
}

  this.surveyEditMode = false;
  this.surveyNumber = '';
  this.surveyEditIndex = null;
}

deleteSurveyDetail(index){
  this.quarryRegister.siteModels.splice(index, 1);
}

surveyEditIndex: number;
editSurveyDetail(index){
  this.surveyEditIndex = index;
  this.surveyEditMode = true;
  const surveyDetail = this.quarryRegister.siteModels[index];

  this.surveyLocation = surveyDetail.location;
  this.surveyCategory = surveyDetail.category;
  this.surveyDistrict = surveyDetail.districtId;
  
  this.quarryRegisterAPiService.getTalukasByUserIdDistrictId(3872, this.surveyDistrict).pipe(map(talukas => {
    this.surveyTalukas = talukas;
    this.surveyTaluka = surveyDetail.talukaId;

    if(surveyDetail.category == 0){
      this.quarryRegisterAPiService.getVillagesByCriteria(this.surveyTaluka).pipe(map(villages => {
        this.surveyVillages = villages;
       this.surveyVillage = Number(surveyDetail.censusId);
      })).subscribe();
    }
    else{
      this.quarryRegisterAPiService.getCitiesByTalukaId(this.surveyTaluka).pipe(map(cities => {
        this.surveyCities = cities;
       this.surveyCity = Number(surveyDetail.censusId);
      })).subscribe();
    }
  })).subscribe();

  this.surveyNumber = surveyDetail.surveyNo;
}

clearSurvey(){
  this.surveyEditMode = false;
  this.surveyNumber = '';
  this.surveyEditIndex = null;

}

updateQuarryRegister(){
  this.quarryRegisterAPiService.updateQuarryRegister(this.quarryRegister).subscribe();
}

createQuarryRegister(){
  this.quarryRegisterAPiService.createQuarryRegister(this.quarryRegister).subscribe();
}

getLatLong(){
  //  if(this.quarryRegister.villageId){
  //    const village = (this.villages ?? []).find(village => village.id == this.quarryRegister.villageId);
  //     return `${village.latitude},${village.longitude}`;
  //  }
  //  else if(this.quarryRegister.cityId){
  //   const city = (this.cities ?? []).find(city => city.id == this.quarryRegister.cityId);
  //   return `${city.latitude},${city.longitude}`;
  //  }
}

mapToQuarryRegisterRequestModel(quarryRegister: IQuarryRegisterResponseModel){
  return {
    id: quarryRegister.id,
    plotType: quarryRegister.plotType,
    name: quarryRegister.name,
    riverCostal: quarryRegister.riverCostal,
    riverName: quarryRegister.riverName,
    ownerShip:quarryRegister.ownerShip,
    govt:quarryRegister.govt,
    departmentId: quarryRegister.departmentId,
    parentPlotId:quarryRegister.parentPlotId,
    category: quarryRegister.category,
    stateId: quarryRegister.stateId,
    districtId: quarryRegister.districtId,
    divisionId: quarryRegister.divisionId,
    talukaId: quarryRegister.talukaId,
    villageId: quarryRegister.talukaId,
    cityId: quarryRegister.talukaId,
    censusId: quarryRegister.censusId,
    area: quarryRegister.area,
    remark:quarryRegister.remark,
    createdBy: quarryRegister.createdBy,
    modifiedBy:quarryRegister.modifiedBy,
    latitude:quarryRegister.latitude,
    longitude: quarryRegister.longitude,
    quarryPhotos:quarryRegister.quarryPhotos,
    siteModels: quarryRegister.siteResponseModels,
    minerals:quarryRegister.minerals,
  }
}

loadQuarryRegister(_quarryRegister: IQuarryRegisterResponseModel){
  this.quarryRegister = this.mapToQuarryRegisterRequestModel(_quarryRegister);
}

  ngOnInit() {
    this.quarryRegisterAPiService.getDistrictByUserIdStateId(3872, 1).pipe(map(districts => {
      this.districts = districts;

      if(districts.length === 1){  
        this.quarryRegister.districtId = districts[0].id;
        this.onDistrictChange(this.quarryRegister.districtId);
        }


        this.quarrySearchCriteria.districtId = districts[0].id;
        this.quarryRegisterAPiService.getQuarryRegisters(this.quarrySearchCriteria).pipe(map(response => {
          this.quarryRegisters = response.responseData1;
          this.quarryRegisterTotalPages = response.responseData2.totalPages;
          this.quarryRegisterCurrentPage = response.responseData2.pageNo;
        })).subscribe();
    })).subscribe();
  }
}     
