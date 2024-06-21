function findTopCountry() {
  var sheets = [
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ]; // List of sheet names to search
  var products = {}; // Object to store product counts

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var welcomeSheet = spreadsheet.getSheetByName("Welcome");

  if (welcomeSheet === null) {
    Logger.log("Sheet 'Welcome' not found.");
    return;
  }

  // Loop through each sheet
  for (var i = 0; i < sheets.length; i++) {
    var sheet = spreadsheet.getSheetByName(sheets[i]);

    if (sheet === null) {
      Logger.log("Sheet '" + sheets[i] + "' not found.");
      continue;
    }

    var lastRow = sheet.getLastRow();
    var productRange = sheet.getRange("T2:T" + lastRow);
    var productValues = productRange.getValues();

    // Loop through each product in the sheet
    for (var j = 0; j < productValues.length; j++) {
      var product = productValues[j][0];

      // Add product to object and increment count
      if (product !== "" && !products[product]) {
        products[product] = 1;
      } else if (product !== "") {
        products[product]++;
      }
    }
  }

  // Find products with highest counts
  var topProducts = [];
  var topCounts = [0, 0, 0];

  for (var product in products) {
    var count = products[product];

    if (count > topCounts[0]) {
      topCounts[2] = topCounts[1];
      topProducts[2] = topProducts[1];
      topCounts[1] = topCounts[0];
      topProducts[1] = topProducts[0];
      topCounts[0] = count;
      topProducts[0] = product;
    } else if (count > topCounts[1]) {
      topCounts[2] = topCounts[1];
      topProducts[2] = topProducts[1];
      topCounts[1] = count;
      topProducts[1] = product;
    } else if (count > topCounts[2]) {
      topCounts[2] = count;
      topProducts[2] = product;
    }
  }

  // Write output to cells J6, J7, and J8
  welcomeSheet.getRange("B11").setValue(topProducts[0]);
  welcomeSheet.getRange("D11").setValue(topProducts[1]);
  welcomeSheet.getRange("F11").setValue(topProducts[2]);
}
