class CharacterService
{
    public static $inject = [
        'CharacterMakerService',
        'CharacterVocabularyService',
        '$rootScope'
    ];

    constructor(private characterMaker : CharacterMakerService,
                private characterVocab : CharacterVocabularyService,
                private $rootScope : ng.IRootScopeService)
    {
        this.LoadCharacter();
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
        this.$rootScope.$broadcast(GameEvents.Character.Changed, <ICharacterChangedEvent> {
            Character: this.Character,
            CharacterVocab: this.characterVocab.GetCharacterVocab(this.Character)
        });
        this.SaveCharacter();
    }

    private SaveCharacter()
    {
        localStorage.setItem(StorageKeys.Character, JSON.stringify(this.Character));
    }

    private LoadCharacter()
    {
        try
        {
            var data = localStorage.getItem(StorageKeys.Character);
            if (data && data.length && data.trim()[0] === '{')
            {
                this.Character = JSON.parse(data);
                this.OnCharacterChanged();
            }
        }
        catch (e)
        {
            console.error('XRPG: Unable to load character from local storage. Data is missing or does not appear to be JSON.', e);
        }
    }
}
xrpg.service('CharacterService', CharacterService);