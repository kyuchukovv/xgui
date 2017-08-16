app.config (function ($stateProvider) {

	$stateProvider.state ('login', {
		url: '/login',
        views: {
			'content': {
				templateUrl: '/js/app/login/login.html',
				controller: 'loginController'
			}
		}
	});
});

// Login
app.controller ('loginController', function ($scope, $auth, $state) {

	$scope.submit = function () {
		var user = {
			email: $scope.email,
			password: $scope.password
		};

		$auth.login (user)
			.then (function (response) {
				// Redirect user here after a successful log in.
				// $auth.setToken (response.api_token);

				$state.transitionTo ('dashboard');
			})
			.catch (function (response) {
				// Handle errors here, such as displaying a notification
				// for invalid email and/or password.
				$scope.logout ();
	  });
	}

    $scope.logout = function () {
		$auth.logout ();    	
		$state.transitionTo ('login');
    }

});
// Login
