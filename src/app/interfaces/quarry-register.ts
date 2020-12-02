export interface IQuarry{

}

export interface IDistrict{
    createdBy: number;
    distCode: number;
    district: string;
    divisionId: number;
    id: number;
    isDeleted: boolean;
    m_District: any;
    stateId: number;
    trainingDate: string;
    trainingDateFormatdate: string;
}

export interface ITaluka{
    createdBy: number;
    id: number;
    taluka: string;
    districtID:number;
    stateID:number;
    divisionID:number;
    talCode:number;
    isDeleted: boolean;
    m_Taluka?: any;
    subDivisionId: number;
    tDistance: number;
    tLatitude: number;
    tLongitude: number;
    trainingDate: string;
    trainingDateFormatDate: string;
}

export interface IVillageCity{
    cratedBy: number;
    createdDate: string;
    createdDateFormatdate: string;
    districtId: number;
    dtCode: string;
    dtName: string;
    extraInvoiceTime: number;
    id: number;
    isDeleted: boolean;
    isTown: boolean;
    latitude: number;
    longitude: number;
    name: string;
    sdtCode: string;
    stCode: string;
    stateId: number;
    talukaId: number;
    tvCode: string;
    updatedDate: string;
    updatedDateFormatdate: string;
}

export interface IGetDistrictsApiResponse{
    statusCode: string;
    statusMessage: string;
    responseData: IDistrict[];
}

export interface IGetTalukasApiResponse{
    statusCode: string;
    statusMessage: string;
    responseData: ITaluka[];
}

export interface IGetVillageCityApiResponse{
    statusCode: string;
    statusMessage: string;
    responseData: IVillageCity[];
}

export interface ISurveyDetail{
    surveyLocation: string;
    surveyLocationLabel: string;
    surveyCategory: number;
    surveyDistrict: number;
    surveyDistrictLabel: string;
    surveyTaluka:number;
    surveyTalukaLabel: string;
    surveyVillageCity: number;
    surveyVillageCityLabel: string;
    surveyNumber: string;
}


export interface IMineral{
    materialId: number;
    type: string;
}
export interface IQuarryRegisterResponseModel {
    area: string;
    category: number;
    categoryName: string;
    censusId: number;
    createdBy: string;
    createdDate: string;
    createdDateFormatdate: string;
    departmentId: string;
    departmentName?: string;
    district: string;
    districtId: number;
    division: string;
    divisionId: number;
    govt: string;
    id: number;
    isDeleted: string;
    key: string;
    latitude: string;
    longitude: string;
    minerals: IMineral[];
    modifiedBy: string;
    modifiedDate: string;
    modifiedDateFormatdate: string;
    name: string;
    ownerDistrict?: string;
    ownerDistrictId: number;
    ownerId: number;
    ownerName?:string;
    ownerShip: string;
    parentPlotId: number;
    parentPlotName?: string;
    plotType: number;
    quantity: number;
    quarryPhotos: IQuarryPhoto[];
    remark: string;
    riverCostal: string;
    riverName: string;
    siteModels?: string;
    siteResponseModels: ISiteModel[];
    state: string;
    stateId: number;
    taluka: string;
    talukaId: number;
    unitType?: string;
    unitTypeId: number;
    villageName: string;
}

export interface IPagingDetails{
    pageNo: number;
    totalPages: number;
}
export interface IQuarryRegisterApiResponse{
    statusCode: string;
    statusMessage: string;
    responseData: {
        responseData1: IQuarryRegisterResponseModel[],
        responseData2: IPagingDetails
    }
}

export interface IQuarrySearchCriteria{
    districtId: number;
    pageNumber: number;
    pagesize: number;
    ownerShip: string;
    location: string;
    plotType: number;
    textSearch: string;
}

export interface IQuarryRegisterUpdateApiResponse{
    responseData_Geofence: any;
    responseData_Quarry: any;
    statusCode_Geofence: string;
    statusCode_Quarry: string;
    statusMessage_Geofence: string;
    statusMessage_Quarry: string;
}
export interface IQuarryPhoto{
    imagePath: string;
}

export interface ISiteModel{
    categoryName: string;
    state: string;
    division: string;
    district: string;
    taluka: string;
    villageName: string;
    siteId:number;
    lclServeyId?: string;
    location: string;
    category: number;
    stateId: number;
    divisionId: number;
    districtId: number;
    talukaId: number;
    censusId: number;
    surveyNo: string;
}

export interface IQuarryApiRequestModel
{
    quarryRegisterModel: IQuarryRegisterRequestModel;
    geofenceModel: IGeofenceModel;
}

export interface IQuarryRegisterRequestModel {
    id: number;
    plotType: number;
    name: string;
    riverCostal: string;
    riverName: string;
    ownerShip: string;
    govt: string;
    departmentId: string;
    parentPlotId: number;
    category: number;
    stateId: number;
    divisionId: number;
    districtId:number;
    villageId: number;
    cityId: number;
    talukaId: number;
    censusId: number;
    area: string;
    remark: string;
    createdBy: string;
    modifiedBy: string;
    latitude: string;
    longitude: string;
    quarryPhotos:IQuarryPhoto[];
    siteModels: ISiteModel[];
    minerals:IMineral[];
}

export interface IGeofenceMaster{
    id: number;
    geofenceName: string;
    geofenceType: number;
    polygonText: string;
    distance: number;
    createdBy: string;
    modifiedBy: string;
}

export interface IGeofenceDetails{
    id: number;
    geofenceid: number;
    alertId: string;
    stateId: number;
    divisionId: number;
    village: string;
    plotTypeId: number;
    plotId: number;
    siteId: number;
    createdBy: string;
    modifiedBy: string;
}

export interface IGeofenceModel{
    GeofenceMaster:IGeofenceMaster;
    GeofenceDetails: IGeofenceDetails;
}