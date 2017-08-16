var app = angular.module ('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'satellizer', 'ngTable', 'relativeDate']);

// Configuration
app.config (function ($urlRouterProvider, $authProvider) {

	$urlRouterProvider.when ('', '/dashboard');
	$urlRouterProvider.otherwise ('/dashboard');
	// Routing

	// Satellizer
	$authProvider.tokenName = 'api_token';
	$authProvider.loginUrl = 'https://dev.api.netfinity.bg/auth/z';
	// Satellizer

});
// Configuration

// Runtime
app.run (function ($rootScope, $state, $auth) {
	// Configure route authentication protection

	$rootScope.$on ("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
		if (!$auth.isAuthenticated () && toState.name != 'login') {
			// User isn’t authenticated
			$state.transitionTo ('login');
			event.preventDefault (); 
		}
	});
	// Configure route authentication protection
	        
});


