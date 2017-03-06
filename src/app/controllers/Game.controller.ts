class GameController
{
    static $inject = [
        'CharacterService',
        'CharacterVocabularyService',
        '$rootScope'
    ];

    public Character : ICharacter = null;
    public GenderMessage = () => this.charVocab.GetShortGenderMessage();

    constructor(private charService : CharacterService,
                private charVocab : CharacterVocabularyService,
                private $rootScope : ng.IRootScopeService)
    {
        $rootScope.$on(GameEvents.Character.Changed, (e, char) => {
            this.Character = char;
        });
    }

    public init()
    {
        this.charService.OnCharacterChanged();
    }
}
xrpg.controller('gameController', GameController);