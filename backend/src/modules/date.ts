export function getDateString(): string {
    let date = new Date()
    let currentDate = date.toLocaleDateString("pl-PL")
    let currentTime = date.toLocaleTimeString()
    return currentDate + " " + currentTime
}

export function logDate(): string {
    return "["+getDateString()+"]"
}