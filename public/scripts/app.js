var app = angular.module('sampleApp', ['ngRoute', 'ngResource']);

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
	return $resource('/api/todos/:id', { id: '@_id' },
	{
		'update': { method:'PUT' },
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