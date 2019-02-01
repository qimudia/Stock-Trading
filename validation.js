

//validation
function validationList(stockName, stocksList) {
  if (stockName.length <= 0) {
    alert("You must input a symbol");
    return false;
  } else {
    for (let i = 0; i < stocksList.length; i++) {
      if (stockName.toUpperCase() === stocksList[i] ) {
        alert("Stock already exist")
        return false;
      }
    }
  }
  return true;
}