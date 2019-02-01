const stocksList = ["AMZN", "BABA", "MSFT", "FB", "AAPL"];

const stockInfoFunc = function() {
  const myStock = $(this).attr("new-data-name");
  //const queryURL1 = `https://api.iextrading.com/1.0/stock/${myStock}/logo?types=quote,news&range=1m&last=10`;
  const queryURL = `https://api.iextrading.com/1.0/stock/${myStock}/batch?types=quote,logo,news&range=1m&last=20`;

  $.ajaxSetup({
    statusCode: {
        404: function(data) {
            alert('Stock symbol does not exist.');
        } 
    }   
});

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    const stockDiv = $("<div>").addClass("stock");

    const companyLogo = response.logo.url;
    console.log(response);

    let image = `<img src='${companyLogo}'>`;
    stockDiv.append(image);

    const companyName = response.quote.companyName;
    const compNameHolder = $("<p>").text(`Company Name: ${companyName}`);
    stockDiv.append(compNameHolder);

    const compStockSymbol = response.quote.symbol;
    const compSymbolHolder = $("<p>").text(`Stock Symbol: ${compStockSymbol}`);
    stockDiv.append(compSymbolHolder);

    const compStockPrice = response.quote.latestPrice;
    const compPriceHolder = $("<p>").text(`Stock Price: ${compStockPrice}`);
    stockDiv.append(compPriceHolder);

    const compNews = response.news[0].summary;
    const compSummaryHolder = $("<p>").text(`News Headline: ${compNews}`);
    stockDiv.append(compSummaryHolder);

    $("#IexTstocks-view").append(stockDiv);
  });
};

//render function
const render = function() {
  $("#buttons-view").empty();
  for (let i = 0; i < stocksList.length; i++) {
    const nButton = $("<button>");
    nButton.addClass("stock-btn");
    nButton.attr("new-data-name", stocksList[i]);
    nButton.text(stocksList[i]);

    $("#buttons-view").append(nButton);
  }
};

// addButton function
const addButton = function(event) {
  event.preventDefault();
  const myStock = $("#stock-input").val().trim();
  if (validationList(myStock, stocksList)) {
    stocksList.push(myStock);

    $("#stock-input").val("");

    render();
  }
};

$("#add-stock").on("click", addButton);
$("#buttons-view").on("click", ".stock-btn", stockInfoFunc);
render();
