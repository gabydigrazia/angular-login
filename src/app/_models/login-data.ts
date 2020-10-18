export interface LoginData {
    Username: string;
    Password: string;
}

export interface ResponseLoginData {
    token: string;
    refreshToken: string;
    role: number;
    firstname: string;
    lastname: string;
}

export interface ResponseSummaryData {
    id: string;
    ownerCompanyName: string;
    carrierCompanyName: string;
    carrierCompanyId: string;
    activityStatus: string;
    status: string;
    service: {
        driverFullName: string;
        driverId: string;
        tractorPlate: string;
        tractorId: string;
        semiFirstPlate: string;
        semiFirstId: string;
        semiSecondPlate: string;
        semiSecondId: string;
    };
    percentageCompleted: number;
    originDescription: string;
    lastMilestoneDescription: string;
    delayed: boolean;
    latitude: number;
    longitude: number;
    start: string;
    externalCode: string;
    dateCreated: string;
}
