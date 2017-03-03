class HomeController
{
    public static $inject = ['$scope', HomeController];

    constructor($scope : ng.IScope)
    {
        // Do something with scope...?
    }

    public init() : ng.IController
    {
        return this;
    }
}
xrpg.controller('HomeController', HomeController.$inject);