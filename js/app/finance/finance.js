angular.module ('app').factory ('financeCompany', function ($resource) {
    return $resource ('https://dev.api.netfinity.bg/z/finance/company/:id',
        {id: '@_id'},
        {
            update: {
                method: 'PUT'
            }
        }
    );
});

