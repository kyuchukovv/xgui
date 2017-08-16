
app.controller ('navbarController', function ($scope, user, profile, financeCompany, $state, $auth) {

    $scope.companies = financeCompany.query ();

    $scope.switchCompany = function (id) {
        profile.update ({id: $scope.user.id}, {id: $scope.user.id, current_company_id: id}).$promise.then (function () {
            $state.reload ();
            userReload ();
        });

    }

    userReload = function () {
        $scope.user = user.get ({});
    }

    $scope.logout = function () {
        $auth.logout ();
        $state.transitionTo ('login');
    }

    userReload ();
});
