function toDateTime(secs) {
    var t = new Date(1970, 0, 1) // Epoch
    t.setSeconds(secs-(3600 * 5))
    return t.toString().split(" ").slice(1,5).join(" ")
}

console.log(toDateTime(Date.now()/1000))