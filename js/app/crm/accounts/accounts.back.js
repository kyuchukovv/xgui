app.config (function ($stateProvider) {
	$stateProvider.state ('crm.accounts.all', {
		url: '/all',
        views: {
            'header@': {
                templateUrl: '/js/app/crm/accounts/all-header.html',
                controller: 'crmAccountAllController'
			},
            'content@': {
                templateUrl: '/js/app/crm/accounts/all.html',
                controller: 'crmAccountAllController'
            }
        },
    });

    $stateProvider.state ('crm.accounts.edit', {
		url: '/edit/:id',
        views: {
            'header@': {
                templateUrl: '/js/app/crm/accounts/edit-header.html',
                controller: 'crmAccountEditController',
                controllerAs: 'c'
			},
            'content@': {
                templateUrl: '/js/app/crm/accounts/edit.html',
                controller: 'crmAccountEditController',
                controllerAs: 'c'
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

// 

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

// 

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

// 

app.controller ('crmAccountEditController', function ($scope, $stateParams, $state, crmAccount) {
    $scope.account = crmAccount.get ({id: $stateParams.id});

    $scope.update = function () {
        crmAccount.update ({id: $scope.account.id}, $scope.account).$promise.then (function (data) {
            // $scope.back ();
            console.log ($scope.account);
        });
    }

    $scope.back = function () {
        $state.go ('crm.accounts.all');
    }
});
