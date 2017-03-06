class CharacterService
{
    public static $inject = [
        'CharacterMakerService',
        '$rootScope'
    ];

    constructor(private characterMaker : CharacterMakerService,
                private $rootScope : ng.IRootScopeService)
    {
    }

    private Character : ICharacter = {
        Name: null,
        Head: <ICharacterHead> {},
        Body: <ICharacterBody> {},
        Crotch: <ICharacterCrotch> {}
    }

    /**
     * Starts a new character, and uses the CharacterMakerService to generate a new character.
     * @param name The name of the character.
     * @param isMale Whether or not to start the character as a male or female.
     */
    public NewCharacter (name : string, isMale : boolean) : void
    {
        this.Character = this.characterMaker.MakeCharacter(isMale);
        this.Character.Name = name;
        this.OnCharacterChanged();
    }

    /**
     * Fires the character.changed event.
     */
    public OnCharacterChanged()
    {
        this.$rootScope.$broadcast(GameEvents.Character.Changed, this.Character);
    }
}
xrpg.service('CharacterService', CharacterService);