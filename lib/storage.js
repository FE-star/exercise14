// 时间戳索引
var storageIndexSet = new Set

function get(key) {
    let flagValue = JSON.parse(localStorage[key])
    return flagValue.value
}

function set(key, value) {
    try {
        // 包装一下对象，添加时间戳
        let flagValue = {
            time: +new Date,
            value: value
        }

        localStorage[key] = JSON.stringify(flagValue)

        // 添加相同key时，更新索引
        if (storageIndexSet.has(key)) {
            storageIndexSet.delete(key)
        }

        storageIndexSet.add(key)
    } catch (e) {
        remove(key, value)
    }
}

function remove(key, value) {
    // 没有索引，可能是刷新过页面。重新读取并排列
    if (storageIndexSet.size == 0) {
        buildIndex()
    }

    for (let oldKey of storageIndexSet) {
        localStorage.removeItem(oldKey)
        storageIndexSet.delete(oldKey)
        break
    }

    set(key, value)
}

function buildIndex() {
    console.log('开始构建索引')
    const buildIndexTimeStart = +new Date

    let temp = []
    for (let key in localStorage) {
        temp.push({ key: key, value: JSON.parse(localStorage[key]) })
    }

    // 选择排序
    for (let outIndex = 0; outIndex < temp.length - 1; outIndex++) {
        let min = outIndex
        for (var innerIndex = outIndex + 1; innerIndex < temp.length; innerIndex++) {
            if (temp[innerIndex].value.time < temp[min].value.time) {
                min = innerIndex
            }
        }

        if (min != outIndex) {
            const swapTemp = temp[min]
            temp[min] = temp[outIndex]
            temp[outIndex] = swapTemp
        }
    }

    for (let index = 0; index < temp.length; index++) {
        storageIndexSet.add(temp[index].key)
    }

    const buildIndexTimeEnd = +new Date
    console.log('结束构建索引：' + (buildIndexTimeEnd - buildIndexTimeStart) / 1000 + 's')
}

window.storage = {
    get: get,
    set: set
}