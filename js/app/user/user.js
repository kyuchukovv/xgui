angular.module ('app').factory ('user', function ($resource) {
    return $resource ('https://dev.api.netfinity.bg/z/user');
});

angular.module ('app').factory ('profile', function ($resource) {
    return $resource ('https://dev.api.netfinity.bg/z/profile/user/:id',
        {id: '@_id'},
        {
            update: {
                method: 'PUT'
            }
        }
    );
});

