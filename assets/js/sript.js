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

    if (header.includes(',')){
        header = header.split(',')[0]
    }

    // filter(Boolean) для фильтрации пустых строк
    csvTextArray = csvTextArray.filter(Boolean)
    // уникальные элементы
    csvTextArray = [...new Set(csvTextArray)]

    // если массив не числовой, то обернуть все значения в кавычки
    let isArrayNumerics = true
    let oneDimensionalListValues = []
    csvTextArray.forEach(function (item) {
        item.split(',').forEach(function (innerItem) {
            if (innerItem === '') return
            if (!isNumeric(innerItem)){
                isArrayNumerics = false
            }
            oneDimensionalListValues.push(innerItem)
        })
    })
    if (!isArrayNumerics){
        for (let i = 0; i < oneDimensionalListValues.length; i++){
            oneDimensionalListValues[i] = `'${oneDimensionalListValues[i]}'`
        }
    }

    let listElementsString = oneDimensionalListValues.join(', ')
    console.log(listElementsString)

    listElementsString = ` in (${listElementsString})`
    return header + listElementsString
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}