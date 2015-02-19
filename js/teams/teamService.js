var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

	this.addNewGame = function(gameObj) {
		var postUrl = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
		debugger;
		var today = new Date();

		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){
			gameObj.won = true;
		} else {
			gameObj.won = false;
		}

		return $http({
			method: 'POST',
			url: "https://api.parse.com/1/classes/losangeleslakers",
			data: {
				'homeTeam': gameObj.homeTeam,
				'homeTeamScore': gameObj.homeTeamScore,
				'opponent': gameObj.opponent,
				'opponentScore': gameObj.opponentScore,
				'createdAt': today,
				'won': gameObj.won
			}
		})
	};//end addNewGame


	this.getTeamData = function(team) {
		var defer = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;

		$http({
			method: 'GET',
			url: url
		}).then(function(data) {
			var results = data.data.results;
			var wins = 0;
			var losses = 0;

			for(var i = 0; i < results.length; i++){
				if(results[i].won === true){
					wins++;
				} else {
					losses++;
				}
			}

			results.wins = wins;
			results.losses = losses;

			defer.resolve(results);
		})

		return defer.promise;
	};




});