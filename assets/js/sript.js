document.addEventListener("DOMContentLoaded", function () {

    const csv = document.getElementById('csv')
    const sql = document.getElementById('sql')

    csv.addEventListener("keyup", function () {
        CSVKeyupTimeout(csv, sql)
    })
    sql.addEventListener("click", function () {
        sql.select()
        document.execCommand("copy");
    })
});
function CSVKeyupTimeout(csv, sql) {
    // для задержки обработки при вводе
    setTimeout(function () {
        sql.value = CSVToSQL(csv)
    }, 700);
}
function CSVToSQL(CSV) {
    let csvTextArray = CSV.value.replaceAll('\r\n','\n').split('\n')

    let header = csvTextArray.shift()
    if (header === '')
        return ''
    if (csvTextArray.length === 0)
        return ''

    // filter(Boolean) для фильтрации пустых строк
    csvTextArray = csvTextArray.filter(Boolean)
    // уникальные элементы
    csvTextArray = [...new Set(csvTextArray)]

    // если массив не числовой, то обернуть все значения в кавычки
    let isArrayNumerics = true
    csvTextArray.forEach(function (item) {
        item.split(',').forEach(function (innerItem) {
            if (!isNumeric(innerItem)){
                isArrayNumerics = false
            }
        })
    })
    if (!isArrayNumerics){
        for (let i = 0; i < csvTextArray.length; i++) {
            let innerItem = csvTextArray[i].split(',')
            for (let j = 0; j < innerItem.length; j++) {
                innerItem[j] = `'${innerItem[j]}'`
            }
            csvTextArray[i] = innerItem
        }
    }

    let listElementsString = csvTextArray.join(', ')

    if (header.includes(',')){
        header = header.split(',')[0]
        listElementsString = listElementsString.replaceAll(',',', ')
    }

    listElementsString = ` in (${listElementsString})`
    return header + listElementsString
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}