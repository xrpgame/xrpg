class CharacterSheetController
{
    static $inject = [
        'CharacterService',
        '$rootScope'
    ];

    public Character : ICharacter = null;
    public Vocab : ICharacterVocab = null;

    constructor(private charService : CharacterService,
                private $rootScope : ng.IRootScopeService)
    {
        $rootScope.$on(GameEvents.Character.Changed, (e, data : ICharacterChangedEvent) =>
        {
            this.Character = data.Character;
            this.Vocab = data.CharacterVocab;
        });
        charService.OnCharacterChanged();
    }
}
xrpg.controller('CharacterSheetController', CharacterSheetController);