var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

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