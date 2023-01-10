const generateCurrentDateTimeString = function(){
    let now = Date()
    const offset = 24
    now = now.substring(0, offset)
    return now
}

module.exports = generateCurrentDateTimeString