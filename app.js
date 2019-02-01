const stocksList = ['AMZN', 'BABA', 'MSFT', 'USO', 'AAPL'];

const stockInfoFunc = function () {

  const myStock = $(this).attr('new-data-name');
  //const queryURL1 = `https://api.iextrading.com/1.0/stock/${myStock}/logo?types=quote,news&range=1m&last=10`;
  const queryURL = `https://api.iextrading.com/1.0/stock/${myStock}/batch?types=quote,logo,news&range=1m&last=20`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {

    const stockDiv = $('<div>').addClass('stock');
    // can't display logo
    //url = "https://storage.googleapis.com/iex/api/logos/${compStockSymbol}.png";
    const companyLogo = response.logo.url;
    console.log(response)
    //<img src="url">
    const compLogoHolder = $('<p>').text(`Company Logo: ${companyLogo}`);
   //const compLogoHolder = $('<p>').text(`Company Logo: <img src="url">`);
    stockDiv.append(compLogoHolder);

    const companyName = response.quote.companyName;
    const compNameHolder = $('<p>').text(`Company Name: ${companyName}`);
    stockDiv.append(compNameHolder);

    const compStockSymbol = response.quote.symbol;
    const compSymbolHolder = $('<p>').text(`Stock Symbol: ${compStockSymbol}`);
    stockDiv.append(compSymbolHolder);

    const compStockPrice = response.quote.latestPrice;
    const compPriceHolder = $('<p>').text(`Stock Price: ${compStockPrice}`);
    stockDiv.append(compPriceHolder);

    const compNews = response.news[0].summary;
    const compSummaryHolder = $('<p>').text(`News Headline: ${compNews}`);
    stockDiv.append(compSummaryHolder);

    $('#IexTstocks-view').prepend(stockDiv);
  });
}

//render function
const render = function () {
  $('#buttons-view').empty();
  for (let i = 0; i < stocksList.length; i++) {
    const nButton = $('<button>');
    nButton.addClass('stock-btn');
    nButton.attr('new-data-name', stocksList[i]);
    nButton.text(stocksList[i]);

    $('#buttons-view').append(nButton);
  }
}

// addButton function
const addButton = function (event) {
  event.preventDefault();
  const myStock = $('#stock-input').val().trim();
  stocksList.push(myStock);

  $('#stock-input').val('');

  render();
}

$('#add-stock').on('click', addButton);
$('#buttons-view').on('click', '.stock-btn', stockInfoFunc);
render();