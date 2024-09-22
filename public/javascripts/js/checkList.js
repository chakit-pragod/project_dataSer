
function toggleAmountField() {
    var dataType = document.getElementById('dataType').value;
    var amountField = document.getElementById('amountField');

    if (dataType === 'income' || dataType === 'expense') {
        amountField.style.display = 'flex'; // แสดงช่องจำนวนเงิน
    } else {
        amountField.style.display = 'none'; // ซ่อนช่องจำนวนเงิน
    }
}
