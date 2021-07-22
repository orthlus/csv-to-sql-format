document.addEventListener("DOMContentLoaded", function (event) {

    const csv = document.getElementById('csv')
    const sql = document.getElementById('sql')

    csv.addEventListener("keyup", function (event) {
        CSVKeyupTimeout(csv, sql)
    })
    sql.addEventListener("click", function (event) {
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
    let listElementsString = ''
    csvTextArray.forEach(function (row) {
        if (row.includes(',')){
            throw 'not valid CSV (can be just one column)'
        }
        if (row === ''){
            /* skip iteration forEach */
            return true
        }
        listElementsString += row
        listElementsString += ', '
    })
    listElementsString = listElementsString.slice(0, listElementsString.length - 2)
    listElementsString = ' in (' + listElementsString + ')'
    console.log(header + listElementsString)
    return header + listElementsString
}