angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
        

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};
        
        // POST 
        $scope.checkTodo = function(todo) {
            $scope.loading = true;
            
            // call update from our service to update done field
            Todos.update(todo, !todo.done)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.todos = data;
            });
        };
        
        $scope.snooze = function(todo) {
            $scope.loading = true;
            
			todo.snoozed = !todo.snoozed;
            // call update from our service to update snooze field
			Todos.update(todo)
                .success(function(data) {
                    $scope.todos = data;
                    $scope.loading = false;
                });

        };
        
        $scope.deleteTodo = function(todo) {
            $scope.loading = true;
            
            Todos.delete(todo)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.todos = data;
            });
        };
        
        $scope.deleteCompletedTodos = function(todo) {
//            $scope.loading = true;
//            
//            Todos.deleteCompleted
//                .success(function(data) {
//                    $scope.loading = false;
//                    $scope.todos = data;
//            });
        };

	}]);
