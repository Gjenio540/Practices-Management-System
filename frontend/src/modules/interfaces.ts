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
    firstname: string
    lastname: string
    studGroup: string
    indexNum: string
    areaName: string
    practiceId: number
    companyName: string
    companyAdress: string
    statusNumber: number
    statusName: string
    statusDate: string
    startdate: string
    endDate: string
    numOfHours: number
    superVisorsName: string
    supervisorsLastName: string
}

export interface statusData {
    id: number
    statusName: string
}