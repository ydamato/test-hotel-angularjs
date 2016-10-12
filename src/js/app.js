/**
 * app - main module for the project
 */
var app = angular.module('app', [
  'ngRoute',
  'hotelsControllers'
]);

/**
 * Configure the route, can be usefull if other pages need to be developed
 */
app.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
	    when('/hotels', {
	      templateUrl: 'src/html/hotels.html',
	      controller: 'hotelsCtrl'
	    }).
	    otherwise({
	      redirectTo: '/hotels'
	    });
	}]);

/**
 * Filter to display distance
 */
app.filter('distance', function () {
	return function (input) {
	    if (input < 1) {
	        return (input * 1000).toFixed(0) + ' m';
	    } else {
	        return input.toFixed(1) + ' km';
	    }
	}
	});

/**
 * Filter to display rating
 * max - the maximum rating
 */
app.filter('rating', function () {
	return function (input, max) {
	    return input + "/" + max;
	}
	});

/**
 * Filter to display rating title
 */
app.filter('ratingTitle', function () {
	return function (input) {
		if(input === "Unrated") {
			return "";
		}
		else {
			return "- \"" + input + "\"";
		}
	}
	});