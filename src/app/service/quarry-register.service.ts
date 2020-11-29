import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDistrict, IGetDistrictsApiResponse, IGetTalukasApiResponse, IGetVillageCityApiResponse, IQuarryRegisterApiResponse, ITaluka, IVillageCity } from '../interfaces/quarry-register';

@Injectable({
    providedIn: 'root'
  })
export class QuarryRegisterAPiService{
    baseUrl = "http://awsmaster.mahamining.com/master";
    apiBaseUrl = "http://awsapi.mahamining.com";

    constructor(private http: HttpClient) { }

    getDistrictByUserIdStateId(userId: number, stateId: number):  Observable<IDistrict[]>{
        return this.http.get<IGetDistrictsApiResponse>(this.baseUrl + '/districts/GetDistrictByUserIdStateId/' + userId + '/' + stateId).pipe(map(response => {
            return response.responseData;
        }), catchError(this.handleError));
    }

    getTalukasByUserIdDistrictId(userId: number, districtId: number) : Observable<ITaluka[]> {
        return this.http.get<IGetTalukasApiResponse>(this.baseUrl + '/talukas/' + userId + '/' + districtId).pipe(map(response => {
            return response.responseData;
        }), catchError(this.handleError));
    }

    getVillagesByCriteria(talukaId: number):Observable<IVillageCity[]> {
        return this.http.get<IGetVillageCityApiResponse>(this.baseUrl + '/villages/GetVillagesByCriteria/' + talukaId).pipe(map(response => {
        return response.responseData;
        }), catchError(this.handleError));
    }

    getCitiesByTalukaId(talukaId: number):Observable<IVillageCity[]> {
        return this.http.get<IGetVillageCityApiResponse>(this.baseUrl + '/villages/GetCityByTalukaId/' + talukaId).pipe(map(response => {
        return response.responseData;
        }), catchError(this.handleError));
    }

    getQuarryRegisters( districtId: number,  pageNumber: number = 1, pagesize: number = 10, ownerShip?: string, location?: string, plotType?:number){
        if(!plotType){
            plotType = 2;
        }
        let queryString  = '?plotType=' + plotType + '&DistrictId='+districtId+ "&pageno="+pageNumber+"&pagesize="+pagesize;
        if(ownerShip){
            queryString+= '&ownership='+ ownerShip;
        }
        if(location){
            queryString+= '&location='+ location;
        }

        return this.http.get<IQuarryRegisterApiResponse>(this.apiBaseUrl + '/mineral-mapping/quarry-registers/GetAll' + queryString).pipe(map(response => {
            return response.responseData;
            }), catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'server error');
    }
}