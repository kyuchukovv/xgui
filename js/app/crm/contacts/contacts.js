app.config (function ($stateProvider) {
	// $stateProvider.state ('crm.accounts.all', {
	// 	url: '/all',
    //     views: {
    //         'content@': {
    //             templateUrl: '/js/app/crm/accounts/all.html',
    //             controller: 'crmAccountAllController',
    //             controllerAs: 'c'
    //         }
    //     },
    // });

    $stateProvider.state ('crm.contacts.edit', {
		url: '/edit/:id',
        views: {
            'content@': {
                templateUrl: '/js/app/crm/contacts/edit.html',
                controller: 'crmContactEditController'
            }
        },
    });
});

angular.module ('app').factory ('crmContact', function ($resource) {
    return $resource ('https://dev.api.netfinity.bg/z/crm/contact/:id',
        {id: '@_id'},
        {
            update: {
                method: 'PUT'
            }
        }
    );
});

// 
app.controller ('crmContactEditController', function ($scope, $stateParams, $state, crmContact, $uibModal) {
    $scope.contact = crmContact.get ({id: $stateParams.id});

    $scope.update = function () {
        crmContact.update ({id: $scope.contact.id}, $scope.contact).$promise.then (function (data) {
            // $scope.back ();
            // console.log ($scope.account);
        });
    }

});
