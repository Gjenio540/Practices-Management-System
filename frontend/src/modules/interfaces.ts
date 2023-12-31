export interface user {
    token: string,
    id: number
}

export interface modalProps {
    open: boolean,
    setOpen: Function
    data?: practiceData
}

export interface previewData {
    firstname: string
    lastname: string
    studGroup: string
    indexNum: string
    statusName: string
    areaName: string
    id: number
}

export interface practiceData {
    id: number
    studentId: number
    firstname: string
    lastname: string
    studGroup: string
    indexNum: string
    areaName: string
    practiceId: number
    typeOfpractice: string
    companyName: string
    companyAdress: string
    nip: string
    regon: string
    statusNumber: number
    statusName: string
    statusDate: string
    startDate: string
    endDate: string
    numOfHours: number
    superVisorsName: string
    supervisorsLastName: string
}

export interface statusData {
    id: number
    statusName: string
}

export interface areaData {
    id: number,
    areaName: string
}

export interface logData {
    id: number
    logMsg: string
    logDate: string
    practiceId: number
}

export interface studentData {
    id: number,
    firstname: string,
    lastname: string,
    indexNum: string,
    studGroup: string,
    areaName: string
    specialty?: string
}

export interface logProps {
    id?: number
}

export interface filterData {
    areas: areaData[],
    statuses: statusData[]
}