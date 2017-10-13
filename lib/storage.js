function get(key) {
    return JSON.parse(localStorage[key])
}

function set(key, value) {
    localStorage[key] = JSON.stringify(value)
}

window.storage = {
    get: get,
    set: set
}