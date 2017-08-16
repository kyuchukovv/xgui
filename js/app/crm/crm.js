app.config (function ($stateProvider) {

    $stateProvider.state ('crm', {
        abstract: true,
        url: '/crm',
        views: {
			'navbar': {
				templateUrl: '/js/app/navbar/navbar.html',
				controller: 'navbarController'
			},
			'navbar-second': {
				templateUrl: '/js/app/navbar/navbar-second.html',
				// controller: 'navbarController'
			}
        }
	});
	
    $stateProvider.state ('crm.accounts', {
        abstract: true,
		url: '/accounts'
	});
	
    $stateProvider.state ('crm.contacts', {
        abstract: true,
		url: '/contacts'
	});
	

});
