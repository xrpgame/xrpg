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

    public Dialog : string = '';
    public Prompts : IPrompt[] = [];

    private SelectedPrompt : string = null;

    constructor(public charService : CharacterService,
                public mapService : MapService,
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
        
        $rootScope.$on(GameEvents.Character.Moved, (e, data : ICharacterMovedEvent) => {
            this.clearDialog();
            if (!data.MapCell.HasVisited && data.MapCell.Encounter)
            {
                var encounter = EncounterRepository.GetEncounterById(data.MapCell.Encounter.Id);
                encounter.RunEncounter(this);
            }
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
        if(this.canMoveUp()) this.mapService.Move(Direction.Up);
    }
    public moveLeft()
    {
        if(this.canMoveLeft()) this.mapService.Move(Direction.Left);
    }
    public moveRight()
    {
        if(this.canMoveRight()) this.mapService.Move(Direction.Right);
    }
    public moveDown()
    {
        if(this.canMoveDown()) this.mapService.Move(Direction.Down);
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

    public addDialog(newDialog : string) : void
    {
        this.Dialog += "\r\n\r\n" + newDialog;
    }
    public replaceDialog(dialog : string) : void
    {
        this.Dialog = dialog;
    }
    public clearDialog() : void
    {
        this.Dialog = '';
    }
    public async presentPrompts(prompts: IPrompt[]) : Promise<string>
    {
        this.SelectedPrompt = null;
        this.Prompts = prompts;
        
        return new Promise<string>(resolve =>
        {
            var check = setInterval(() =>
            {
                if (this.SelectedPrompt && this.SelectedPrompt.length > 0)
                {
                    console.info('Resolving button: ' + this.SelectedPrompt)
                    resolve(this.SelectedPrompt);
                    this.Prompts = null;
                    clearInterval(check);
                    this.$rootScope.$apply();
                    console.info('Done resolving button: ' + this.SelectedPrompt)
                }
            }, 50);
        });
    }
    public ProcessPrompt(selectedPrompt: string)
    {
        console.info('Button press:' + selectedPrompt)
        this.SelectedPrompt = selectedPrompt;
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