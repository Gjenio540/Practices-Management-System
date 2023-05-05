export function getDateString()
{
    let date = new Date()
    let currentDate = date.toLocaleDateString("pl-PL")
    let currentTime = date.toLocaleTimeString()
    return currentDate + " " + currentTime
}

export function logDate()
{
    return "["+getDateString()+"]"
}