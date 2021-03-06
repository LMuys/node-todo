angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
            delete : function(todo) {
                return $http.delete('/api/todos/' + todo._id);
            },
            deleteCompleted : function() {
                return $http.delete('/api/todos/');
            },
            update : function(todo) {
                return $http.put('/api/todos/' + todo._id, todo);
            }

		}
	}]);
