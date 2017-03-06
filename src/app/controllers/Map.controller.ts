class MapController
{
    static $inject = [
        'MapService',
        '$rootScope'
    ];

    public Map : IMap = null;
    public Position : IVector = null;

    constructor(private mapService : MapService,
                private $rootScope : ng.IRootScopeService)
    {
        $rootScope.$on(GameEvents.Map.Changed, (e, data : IMapChangedEvent) => {
            this.Map = data.Map;
            this.Position = data.Position;
        });
        this.mapService.OnMapChanged();
    }
}
xrpg.controller('MapController', MapController);