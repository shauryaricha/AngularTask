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
export interface IQuarryRegister {
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
    quarryPhotos: [];
    remark: string;
    riverCostal: string;
    riverName: string;
    siteModels?: string;
    siteResponseModels: [];
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
        responseData1: IQuarryRegister[],
        responseData2: IPagingDetails
    }
}