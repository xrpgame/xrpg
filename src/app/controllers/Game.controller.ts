class GameController
{
    static $inject = [
        'CharacterService',
        'MapService',
        '$rootScope'
    ];

    public Character : ICharacter = null;
    public CharacterVocab : ICharacterVocab = null;
    public Map : IMap = null;
    public ShowCharacterSheet = false;
    public ShowMap = false;

    constructor(private charService : CharacterService,
                private mapService : MapService,
                private $rootScope : ng.IRootScopeService)
    {
        $rootScope.$on(GameEvents.Character.Changed, (e, data : ICharacterChangedEvent) => {
            this.Character = data.Character;
            this.CharacterVocab = data.CharacterVocab;
        });
        $rootScope.$on(GameEvents.Map.Changed, (e, data : IMapChangedEvent) => {
            this.Map = data.Map;
        });

        this.charService.OnCharacterChanged();
        this.mapService.OnMapChanged();
    }

    public toggleCharacterSheet()
    {
        this.ShowCharacterSheet = !this.ShowCharacterSheet;
    }

    public toggleMap()
    {
        this.ShowMap = !this.ShowMap;
    }

    public moveUp()
    {
        this.mapService.Move(Direction.Up);
    }
    public moveLeft()
    {
        this.mapService.Move(Direction.Left);
    }
    public moveRight()
    {
        this.mapService.Move(Direction.Right);
    }
    public moveDown()
    {
        this.mapService.Move(Direction.Down);
    }
}
xrpg.controller('gameController', GameController);