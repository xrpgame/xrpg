var xrpg = angular.module('xrpg', ['ngRoute']);
var RouteConfig = (function () {
    function RouteConfig($routeProvider) {
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
    return RouteConfig;
}());
RouteConfig.$inject = ['$routeProvider'];
xrpg.config(RouteConfig);
var HomeController = (function () {
    function HomeController($scope) {
        // Do something with scope...?
    }
    HomeController.prototype.init = function () {
        return this;
    };
    return HomeController;
}());
HomeController.$inject = ['$scope', HomeController];
xrpg.controller('HomeController', HomeController.$inject);
