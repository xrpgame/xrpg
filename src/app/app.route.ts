class RouteConfig
{
    static $inject = ['$routeProvider'];

    constructor($routeProvider : ng.route.IRouteProvider)
    {
        $routeProvider.when("/game", {
            templateUrl: 'app/templates/game.html',
            controller: 'GameController as vm'
        })
        .when("/home", {
            templateUrl: "app/templates/home.html",
            controller: "HomeController as vm"
        })
        .otherwise("/home");
    }
}

xrpg.config(RouteConfig);
