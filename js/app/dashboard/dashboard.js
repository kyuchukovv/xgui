app.config (function ($stateProvider) {

  $stateProvider.state ('dashboard', {
    url: '/dashboard',
      views: {
        'navbar': {
          templateUrl: '/js/app/navbar/navbar.html',
          controller: 'navbarController'
        },
        'navbar-second': {
          templateUrl: '/js/app/navbar/navbar-second.html',
          // controller: 'navbarController'
        },
        'content': {
          templateUrl: '/js/app/dashboard/dashboard.html',
          controller: 'dashboardController',
        }
      }
  });
});

app.controller ('dashboardController', function ($scope, NgTableParams) {

});
