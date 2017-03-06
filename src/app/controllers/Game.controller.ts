class GameController
{
    static $inject = [
        'CharacterService',
        '$rootScope'
    ];

    public Character : ICharacter = null;
    public CharacterVocab : ICharacterVocab = null;
    public ShowCharacterSheet = false;

    constructor(private charService : CharacterService,
                private $rootScope : ng.IRootScopeService)
    {
        $rootScope.$on(GameEvents.Character.Changed, (e, data : ICharacterChangedEvent) => {
            this.Character = data.Character;
            this.CharacterVocab = data.CharacterVocab;
        });
    }

    public init()
    {
        this.charService.OnCharacterChanged();
    }

    public toggleCharacterSheet()
    {
        this.ShowCharacterSheet = !this.ShowCharacterSheet;
    }
}
xrpg.controller('gameController', GameController);