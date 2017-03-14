class GameController
{
    static $inject = [
        'CharacterService',
        'MapService',
        '$rootScope',
        '$location'
    ];

    public Character : ICharacter = null;
    public CharacterVocab : ICharacterVocab = null;
    public Map : IMap = null;
    public ShowCharacterSheet = false;
    public ShowMap = false;
    
    public EnableAdminControls = true;

    constructor(private charService : CharacterService,
                private mapService : MapService,
                private $rootScope : ng.IRootScopeService,
                private $location : ng.ILocationService)
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

    public canMoveUp() : boolean
    {
        return this.mapService.CanMoveUp();
    }
    public canMoveDown() : boolean
    {
        return this.mapService.CanMoveDown();
    }
    public canMoveLeft() : boolean
    {
        return this.mapService.CanMoveLeft();
    }
    public canMoveRight() : boolean
    {
        return this.mapService.CanMoveRight();
    }

    // Admin Stuff
    public revealMap()
    {
        this.mapService.RevealMap();
    }
    public startOver()
    {
        this.$location.url('/newCharacter');
    }
}
xrpg.controller('gameController', GameController);