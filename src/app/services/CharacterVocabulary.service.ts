class CharacterVocabularyService
{
    static $inject = [
        'CharacterService',
        '$rootScope'
    ];

    private Character : ICharacter = null;

    constructor(private charService : CharacterService,
                private $rootScope : ng.IRootScopeService)
    {
        $rootScope.$on(GameEvents.Character.Changed, (e, char) =>
        {
            this.Character = char;
        });
    }

    /**
     * Gets a short gender message for the character, like "You are a girl.".
     */
    public GetShortGenderMessage() : string
    {
        if (this.Character.Crotch.PenisLength && this.Character.Crotch.VaginaDepth && this.Character.Crotch.BallCount)
        {
            return `You are a hermaphrodite, you have both sets of genitals, and ${this.GetBallCount()}, too.`;
        }
        if (this.Character.Crotch.PenisLength && this.Character.Crotch.VaginaDepth)
        {
            return 'You are a hermaphrodite, you have both sets of genitals.';
        }
        if (this.Character.Crotch.VaginaDepth && this.Character.Crotch.BallCount)
        {
            return `You are a girl, but you also have ${this.GetBallCount()}, too.`;
        }
        if (this.Character.Crotch.VaginaDepth)
        {
            return `You are a girl.`;
        }
        if (this.Character.Crotch.PenisLength && this.Character.Crotch.BallCount)
        {
            return `You are a boy, with ${this.GetBallCount(true)}.`;
        }
        if (this.Character.Crotch.PenisLength)
        {
            return "You are a boy, but you don't have any balls.";
        }
        return 'You have nothing between your legs. You are androgynous.';
    }

    /**
     * Gets the number of balls for the character, e.g. "1 ball" or "3 balls".
     * @param addNormal Whether or not to include the word "normal". Be sure they're a boy! :)
     */
    public GetBallCount(addNormal = false) : string
    {
        return addNormal && this.Character.Crotch.BallCount === 2
            ? '2 normal balls'
            : plural(this.Character.Crotch.BallCount, 'ball', 'balls');
    }
}
xrpg.service('CharacterVocabularyService', CharacterVocabularyService);