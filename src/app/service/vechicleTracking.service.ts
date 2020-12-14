import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDistrict, IGeofenceModel, IGetDistrictsApiResponse, IGetTalukasApiResponse, IGetVillageCityApiResponse, IQuarryApiRequestModel, IQuarryRegisterApiResponse, IQuarryRegisterRequestModel, IQuarryRegisterUpdateApiResponse, IQuarrySearchCriteria, ITaluka, IVillageCity } from '../interfaces/quarry-register';

@Injectable({
    providedIn: 'root'
  })
export class VechicleTrackingService{
    baseUrl = "http://awsmaster.mahamining.com/master";
    apiBaseUrl = "http://awsapi.mahamining.com";

    constructor(private http: HttpClient) { }

    getCompanyDetails() {
        return this.http.post('http://localhost:59601/vts.aspx/getGPSDeviceCompany_VTS', {}).pipe(map(response => {
            console.log(response)
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
