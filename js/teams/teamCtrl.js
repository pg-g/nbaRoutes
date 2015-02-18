var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){


	$scope.teamData = teamData;
	$scope.newGame = {};
	$scope.showNewGameForm = false;

	$scope.toggleNewGameForm = function(showNewGameForm){
		// debugger;
		$scope.showNewGameForm = !$scope.showNewGameForm;
	};

	if($routeParams.team === 'utahjazz'){
		$scope.homeTeam = 'Utah Jazz';
		$scope.logoPath = 'images/jazz-logo.png';
		console.log($scope)
	} else if($routeParams.team === 'losangeleslakers'){
		$scope.homeTeam = 'Los Angeles Lakers';
		$scope.logoPath = '/images/lakers-logo.png';
		console.log($scope)
	} else if($routeParams.team === 'miamiheat'){
		$scope.homeTeam = 'Miami Heat';
		$scope.logoPath = '/images/heat-logo.png';
	}

	$scope.addNewGame = function(gameObj) {
		var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;

		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){
			gameObj.won = true;
		} else {
			gameObj.won = false;
		}

		return $http({
			method: 'POST',
			url: url
		})
	};//end addNewGame

	$scope.submitGame = function(){
		$scope.homeTeam.split(' ').join('').toLowerCase();
		addNewGame($scope.newGame).then(function(){
			getTeamData($scope.newGame.homeTeam).then(function(data){
				$scope.teamData = data;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			});
		});
	};

	$scope.getTeamData = function(team){
		
	};

	// $scope.getTeamData();


});