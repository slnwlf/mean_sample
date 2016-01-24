var app = angular.module('sampleApp', ['ngRoute', 'ngResource']);

var parseRequestHeaders = {
  'X-Parse-Application-Id': 'an84MXD5aeBM7P0XUtfNIJd7vwzOLilSUkxCR2M1',
  'X-Parse-REST-API-Key': 'iPBse1TGWDG2YiT6s17Z9tNGTuaOj0kq7ca3LIyP'
};

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'TodosIndexCtrl'
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

app.factory('Todo', ['$resource', function ($resource) {
	return $resource('https://api.parse.com/1/classes/Todo:id', { id: '@_id' },
	{
		'update': { 
			method:'PUT',
			headers: parseRequestHeaders }
		// 'query' : { method: 'GET', isArray: false }
	});

    // $resource function exposes all five RESTful methods/routes
    // { 'get'   : { method: 'GET'                },
    //   'save'  : { method: 'POST'               },
    //   'query' : { method: 'GET', isArray: true },
    //   'remove': { method: 'DELETE'             },
    //   'delete': { method: 'DELETE'             } };

}]);

app.controller('TodosIndexCtrl', ['$scope', 'Todo', function ($scope, Todo) {
	$scope.todos = Todo.query();
	$scope.todo = {};
	console.log($scope.todos);

	$scope.createTodo = function() {
		var newTodo = Todo.save($scope.todo);
		$scope.todo = {};
		$scope.todos.unshift(newTodo);
	};

	$scope.markDone = function(todo) {
		todo.done = (todo.done ? false : true);
		Todo.update(todo);
	};

	$scope.updateTodo = function(todo) {
		Todo.update(todo);
		todo.editForm = false;
	};

	$scope.deleteTodo = function(todo) {
		Todo.remove({ id: todo._id });
		var todoIndex = $scope.todos.indexOf(todo);
		$scope.todos.splice(todoIndex, 1);
	};
}]);