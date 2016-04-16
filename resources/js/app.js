(function(){
  var currencyValues= {
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
  currencyValues.init();
  currencyValues.makeRequest();

  var currencyExchanger = {

    init: function() {
      this.cacheDom();
      this.bindEvents();
    },

    cacheDom: function() {
      this.$exchangerInput = $(".exchanger-input");
      this.$exchangerOutput = $(".exchanger-output");
      this.$currencyInput = $(".currency-input");
      this.$currencyOutput = $(".currency-output");
    },

    bindEvents: function(){
      this.$currencyInput.on("input", this.makeRequest.bind(this, this.$currencyInput, this.$exchangerInput, this.$currencyOutput, this.$exchangerOutput));
      this.$currencyOutput.on("input", this.makeRequest.bind(this, this.$currencyOutput, this.$exchangerOutput, this.$currencyInput, this.$exchangerInput));
      this.$exchangerInput.on("input", this.makeRequest.bind(this, this.$currencyInput, this.$exchangerInput, this.$currencyOutput, this.$exchangerOutput));
      this.$exchangerOutput.on("input", this.makeRequest.bind(this, this.$currencyOutput, this.$exchangerOutput, this.$currencyInput, this.$exchangerInput));
    },

    makeRequest: function(input, inputCurrency, output, outputCurrency) {
      var req = $.ajax({
        url: "https://api.fixer.io/latest?base=" + inputCurrency.val()
      });
      req.done(function(data){
        fx.base = data.base;
        fx.rates = data.rates;
        var change = fx.convert(input.val(), {from: inputCurrency.val(), to: outputCurrency.val()});
        output.val(change.toFixed(2));
      }.bind(this));
    }

  }
  currencyExchanger.init();

  //console.log(fx.convert(12.99, {from: "GBP", to: "HKD"}));
})();
