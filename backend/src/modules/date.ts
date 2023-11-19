export function getCurrentDate(): string {
    let date = new Date().toISOString();
    return date;
}

export function getDateString(): string {
    let date = new Date();
    let currentDate = date.toLocaleDateString("pl-PL");
    let currentTime = date.toLocaleTimeString();
    return currentDate + " " + currentTime;
}

export function logDate(): string {
    return "["+getDateString()+"]";
}