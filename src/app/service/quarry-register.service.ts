import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDistrict, IGeofenceModel, IGetDistrictsApiResponse, IGetTalukasApiResponse, IGetVillageCityApiResponse, IQuarryApiRequestModel, IQuarryRegisterApiResponse, IQuarryRegisterRequestModel, IQuarryRegisterUpdateApiResponse, IQuarrySearchCriteria, ITaluka, IVillageCity } from '../interfaces/quarry-register';

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

        getQuarryRegisters( quarrySearchCriteria: IQuarrySearchCriteria){
            let plotType = quarrySearchCriteria.plotType ? quarrySearchCriteria.plotType: 2;
        let queryString  = '?plotType=' + plotType + '&DistrictId='+quarrySearchCriteria.districtId+ "&pageno="+quarrySearchCriteria.pageNumber+"&pagesize="+quarrySearchCriteria.pagesize;
        if(quarrySearchCriteria.ownerShip){
            queryString+= '&ownership='+ quarrySearchCriteria.ownerShip;
        }
        if(quarrySearchCriteria.location){
            queryString+= '&location='+ quarrySearchCriteria.location;
        }
        if(quarrySearchCriteria.textSearch){
            queryString+= '&textSearch='+ quarrySearchCriteria.textSearch;
        }

        return this.http.get<IQuarryRegisterApiResponse>(this.apiBaseUrl + '/mineral-mapping/quarry-registers/GetAll' + queryString).pipe(map(response => {
            return response.responseData;
            }), catchError(this.handleError));
    }

    createQuarryRegister(quarryRegister: IQuarryRegisterRequestModel) {
        return this.http.post<IQuarryRegisterUpdateApiResponse>(this.apiBaseUrl + '/mineral-mapping/quarry-registers-wrapper', quarryRegister).pipe(map(response => {
            return response;
            }), catchError(this.handleError));
    }

    updateQuarryRegister(quarryRegister: IQuarryRegisterRequestModel) {
        const quarryRegisterApiRequestModel: IQuarryApiRequestModel = {
            quarryRegisterModel: quarryRegister,
            geofenceModel: {} as IGeofenceModel
        };
        return this.http.put<IQuarryRegisterUpdateApiResponse>(this.apiBaseUrl + '/mineral-mapping/quarry-registers-wrapper', quarryRegisterApiRequestModel).pipe(map(response => {
            return response;
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