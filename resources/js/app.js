(function(){
  var currencyExchange = {
    // Initiate the app by caching dom and binding events
    init: function() {
      this.cacheDom();
      this.bindEvents();
    },
    // Cache dom and create variables
    cacheDom: function() {
      this.$base = $(".base");
      this.$ratesCol1 = $("#col1");
      this.$ratesCol2 = $("#col2");
      this.$selectBase = $(".selectBase");
    },
    // When the value of selctbase changes call make a request bound to this
    bindEvents: function() {
      this.$selectBase.on("change", this.makeRequest.bind(this));
    },
    // Method that makes the ajax request and appends information to dom
    makeRequest: function() {
      var base = this.$selectBase.val();
      this.$base.empty();
      this.$ratesCol1.empty();
      this.$ratesCol2.empty();
      var req = $.ajax({
        url: "https://api.fixer.io/latest?base=" + base
      });
      req.done(function(data){
        var baseRate = data.base;
        var exchangeRates = data.rates;
        this.$base.append("<h3>Base rate: " + baseRate + "</h3>");
        var count = 1;
        for(var key in exchangeRates) {
          var col = this.$ratesCol1;
          if(count % 2 === 0) { col = this.$ratesCol2; }
          col.append("<li>" + key + ": " + exchangeRates[key] + "</li>");
          count++;
        }
      }.bind(this));
    }
  }
  // Initiate the app
  currencyExchange.init();
  currencyExchange.makeRequest();
})();
