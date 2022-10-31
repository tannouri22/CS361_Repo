function updateName(name) {
    document.getElementsByName('updatePrimaryKey')[0].value = `${name}`;
}

function updateEndDate(endDate) {
    let parsed = parseInt(endDate);
     document.getElementsByName('updateEndDate')[0].value = `${parsed}`;
     showform('update');
}
