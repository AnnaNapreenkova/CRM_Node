module.exports.randomString = (length) => {
    return Math.random().toString(36).slice(-length);
}

module.exports.randomNumber = (length) => {
    return Math.random().toString().slice(-length)
}