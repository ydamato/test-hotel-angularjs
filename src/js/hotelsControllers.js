/**
 * Module that contains the controller<br/>
 * Other controllers can be added in this modules
 */
var hotelsControllers = angular.module('hotelsControllers', []);

/**
 * Controller 'hotelsCtrl'
 */
hotelsControllers.controller('hotelsCtrl', ['$scope', '$http',
  function ($scope, $http) {
	
    $scope.nbOfElementsToDisplay = 10;
    $scope.currentPage = 1;
    $scope.nbOfPages = 0;
    $scope.pagination = new Array();
    $scope.sortType = 'Distance';
    $scope.sortText = 'Distance';
    
    //Get the full result list
    $http.get('src/json/hotels.json').success(function(data) {
      $scope.hotels = data.Establishments;
      $scope.applyFilters();
    });
    
    /**
     * Apply filters and sort choice done by the user
     */
    $scope.applyFilters = function() {
    	$scope.hotelsWithFilter = $scope.hotels.filter(function(hotel) {
        	var isName = !$scope.filterName || hotel.Name.toLowerCase().indexOf($scope.filterName.toLowerCase()) > -1;
        	var isMinCost = !$scope.filterMinCost || hotel.MinCost >= parseInt($scope.filterMinCost);
        	var isStars = !$scope.filterStars || hotel.Stars >= parseInt($scope.filterStars);
        	var isRating = !$scope.filterUserRating || hotel.UserRating >= parseInt($scope.filterUserRating);
            return isName && isMinCost && isStars && isRating;
         }); 	
    	$scope.sortList();
    	$scope.createPagination();
    };
    
    /**
     * Sort the list depending of the sort type choosen by the user
     */
    $scope.sortList = function() {
    	$scope.hotelsWithFilter = $scope.hotelsWithFilter.sort(function(hotel1, hotel2){
    		if(hotel1[$scope.sortType] < hotel2[$scope.sortType]) return -1;
    		if(hotel1[$scope.sortType] > hotel2[$scope.sortType]) return 1;
    		return 0;  		
    	});
    }
    
    /**
     * Calculate and create the pagination
     */
    $scope.createPagination = function() {
    	$scope.nbOfPages =  Math.ceil($scope.hotelsWithFilter.length / $scope.nbOfElementsToDisplay);
    	$scope.pagination = new Array();
	    	for(var i=1; i<=$scope.nbOfPages; i++) {
	    		$scope.pagination.push({text:i, page:i});
	    	}
    	$scope.goToPage(1);
    }
    
    /**
     * Init the pagination once the user change his filter<br/>
     * Come back to page 1 with update of the number of pages
     */
    $scope.goToPage = function(pageNumber) {
    	if(pageNumber) {
    		$scope.redesignPagination(pageNumber);
	    	$scope.currentPage = pageNumber;
	    	var firstElementToDisplay = ($scope.currentPage - 1) * $scope.nbOfElementsToDisplay;
	    	var lastElementToDisplay = firstElementToDisplay + $scope.nbOfElementsToDisplay;
	    	$scope.hotelsDisplayed = $scope.hotelsWithFilter.slice(firstElementToDisplay, lastElementToDisplay);
	    	window.scrollTo(0, 0);
    	}
    }
    
    /**
     * Redesign pagination if number of pages > 12
     * only the Fist page and the last page are always displayed
     * Display the current page anf the pages n-1 and n+1
     */
    $scope.redesignPagination = function(pageNumber) {
		if($scope.nbOfPages > 12) {
			$scope.pagination = new Array();
	    	if(pageNumber < 3) {
		    	for(var i=1; i<=3; i++) {
		    		$scope.pagination.push({text:i, link:i});
		    	}
		    	$scope.pagination.push({text:'...'});
		    	$scope.pagination.push({text:$scope.nbOfPages, link:$scope.nbOfPages});
	    	}
	    	else if(pageNumber > $scope.nbOfPages - 2) {
		    	$scope.pagination.push({text:1, link:1});
		    	$scope.pagination.push({text:'...'});
		    	for(var i=$scope.nbOfPages-2; i<=$scope.nbOfPages; i++) {
		    		$scope.pagination.push({text:i, link:i});
		    	}
	    	}
	    	else {
	    		$scope.pagination.push({text:1, link:1});
	    		if(pageNumber > 3) {
	    			$scope.pagination.push({text:'...'});
	    		}
		    	for(var i=pageNumber-1; i<=pageNumber+1; i++) {
		    		$scope.pagination.push({text:i, link:i});
		    	}
		    	if(pageNumber < $scope.nbOfPages - 2) {
		    		$scope.pagination.push({text:'...'});
		    	}
	    		$scope.pagination.push({text:$scope.nbOfPages, link:$scope.nbOfPages});
	    	}
		}
    }
    
    /**
     * Store the sort type choosen by the user
     */
    $scope.changeSort = function(type, txt) {
        $scope.sortType = type;
        $scope.sortText = txt;
    }
    
    /**
     * Create an Array depending of the number of stars
     */
    $scope.getStarsArray= function(starsNumber) {
    	var array = new Array();
    	for(var i=1; i<=starsNumber; i++) {
    		array.push(i);
    	}
    	return array;
    }
    
  }]);