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
    const csvTextArray = CSV.value.replaceAll('\r\n','\n').split('\n')
    let header = csvTextArray.shift()
    if (header.includes(',')){
        throw 'not valid CSV (can be just one column)'
    }
    // filter(Boolean) для фильтрации пустых строк
    let listElementsString = csvTextArray.filter(Boolean).join(', ')
    if (header === '')
        return ''
    if (listElementsString === '')
        return ''
    listElementsString = ` in (${listElementsString})`
    return header + listElementsString
}