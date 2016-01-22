var app = angular.module('sampleApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html',
				controller: 'HomeCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false

		});
	}
	]);

app.controller('HomeCtrl', ['$scope', function ($scope) {
	$scope.homeTest = "Welcome to the homepage!";
}]);