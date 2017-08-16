app.config (function ($stateProvider) {
	$stateProvider.state ('crm.accounts.all', {
		url: '/all',
        views: {
            'content@': {
                templateUrl: '/js/app/crm/accounts/all.html',
                controller: 'crmAccountAllController',
                controllerAs: 'c'
            }
        },
    });

    $stateProvider.state ('crm.accounts.edit', {
		url: '/edit/:id',
        views: {
            'content@': {
                templateUrl: '/js/app/crm/accounts/edit.html',
                controller: 'crmAccountEditController'
            }
        },
    });
});

// 
angular.module ('app').factory ('crmAccount', function ($resource) {
    return $resource ('https://dev.api.netfinity.bg/z/crm/account/:id',
        {id: '@_id'},
        {
            update: {
                method: 'PUT'
            }
        }
    );
});

// -- -- -- -- -- All
app.controller ('crmAccountAllController', function ($scope, $state, NgTableParams, crmAccount, $uibModal) {
    this.tp = new NgTableParams ({},
        {
            getData: function (params) {
                return crmAccount.query ().$promise.then (function (data) {
                    // params.total (10);
                    return data;
                });
            }
        }
    );

    $scope.add = function () {
        modal = $uibModal.open ({
            templateUrl: '/js/app/crm/accounts/add.html',
            controller: 'crmAccountAddController'
        });
    }
});

app.controller ('crmAccountAddController', function ($scope, $state, crmAccount) {
    $scope.close = function () {
        $scope.$close ();
    }

    $scope.submit = function () {
        crmAccount.save ($scope.account).$promise.then (function (data) {
            $scope.$close ();
            $state.go ('crm.accounts.edit', {id: data.id});
        });
    }
});

// -- -- -- -- -- Edit
app.controller ('crmAccountEditController', function ($scope, $stateParams, $state, crmAccount, $uibModal) {
    $scope.account = crmAccount.get ({id: $stateParams.id});

    $scope.update = function () {
        crmAccount.update ({id: $scope.account.id}, $scope.account).$promise.then (function (data) {
            // $scope.back ();
            // console.log ($scope.account);
        });
    }

    $scope.add = function () {
        modal = $uibModal.open ({
            templateUrl: '/js/app/crm/contacts/add.html',
            scope: $scope,
            controller: 'crmAccountAddContactController'
        });
    }
});

app.controller ('crmAccountAddContactController', function ($scope, $state, crmContact) {
    $scope.contact = {account_id: $scope.account.id};

    $scope.close = function () {
        $scope.$close ();
    }

    $scope.submit = function () {
        crmContact.save ($scope.contact).$promise.then (function (data) {
            $scope.$close ();
            $state.go ('crm.contacts.edit', {id: data.id});
        });
    }
});

// 


