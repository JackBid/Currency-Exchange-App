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
      this.$rates = $(".rates");
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
      this.$rates.empty();
      var req = $.ajax({
        url: "https://api.fixer.io/latest?base=" + base
      });
      req.done(function(data){
        var baseRate = data.base;
        var exchangeRates = data.rates;
        console.log(this);
        this.$base.append("<h3>Base rate: " + baseRate + "</h3>");
        for(var key in exchangeRates) {
          this.$rates.append("<li>" + key + ": " + exchangeRates[key] + "</li>");
        }
      }.bind(this));
    }
  }
  // Initiate the app
  currencyExchange.init();
})();
