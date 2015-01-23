//var app = angular.module('app', ['firebase']);

var app = angular.module('app', []);

app.filter('range', function() {
    return function(val, range) {
        range = parseInt(range);
        for (var i=0; i<range; i++)
            val.push(i);
        return val;
    };
});