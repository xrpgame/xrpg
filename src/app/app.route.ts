class RouteConfig {
    static $inject = ['$routeProvider', '$locationProvider'];

    constructor($routeProvider: ng.route.IRouteProvider,
                $locationProvider: ng.ILocationProvider)
    {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/home.html',
                controller: 'homeController',
                controllerAs: 'hc'
            })
            .when('/game', {
                templateUrl: 'app/templates/game.html',
                controller: 'gameController',
                controllerAs: 'gc'
            })
            .when('/newCharacter', {
                templateUrl: 'app/templates/newCharacter.html',
                controller: 'newCharacterController',
                controllerAs: 'ncc'
            })
            .otherwise('/');
    }
}

xrpg.config(RouteConfig);
