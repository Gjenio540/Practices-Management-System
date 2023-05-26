<<<<<<< Updated upstream
export function getDateISOString(): string {
    let date = new Date()
    let currentDate = date.toISOString()
    return currentDate
}

=======
>>>>>>> Stashed changes
export function getDateString(): string {
    let date = new Date()
    let currentDate = date.toLocaleDateString("pl-PL")
    let currentTime = date.toLocaleTimeString()
    return currentDate + " " + currentTime
}

export function logDate(): string {
    return "["+getDateString()+"]"
}