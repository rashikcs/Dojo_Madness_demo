var app = angular.module('app', ['ui.bootstrap']);
 
//#######################
//JSA CONTROLLER
//#######################
 
app.controller('jsaLoadMatchInfo', function($scope, $http, $location) {
	$scope.matchInfo = [],
	$scope.filteredInfos = [],
	$scope.currentPage = 1,
	$scope.numPerPage = 10,
	$scope.maxSize = 5;

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

	function getAllCustomers(){
		var url = "api/matchInfo/all";
		
		// do getting
		$http.get(url).then( response => {
			$scope.getDivAvailable = true;
			
			if (JSON.stringify(response.data)=='{}'){
				alert("empty")
				$scope.matchInfowindow.localStorage.getItem('infos') || '{"weeks":[]}'
			}
			else {
				$scope.matchInfo = response.data;
				window.localStorage.setItem('infos', $scope.matchInfo );
			}

			if ($scope.currentPage==1)
			{
				$scope.filteredInfos = $scope.matchInfo.slice(1, 10);
			}
		}, response => {
			$scope.postResultMessage = "Error Status: " +  response.statusText;
		});
	}
	
	getAllCustomers();

	$scope.$watch('currentPage + numPerPage', function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		, end = begin + $scope.numPerPage;

		$scope.filteredInfos = $scope.matchInfo.slice(begin, end);
	});
});