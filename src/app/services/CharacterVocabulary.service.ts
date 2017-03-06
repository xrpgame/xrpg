class CharacterVocabularyService
{
    private Character : ICharacter = null;

    public GetCharacterVocab(char : ICharacter) : ICharacterVocab
    {
        this.Character = char;

        return {
            ShortGenderMessage: this.GetShortGenderMessage(),
            BallCountMessage: this.GetBallCount(),
            HairColor: this.EnumName(Color, this.Character.Head.HairColor),
            HairLength: this.GetHairLength(),
            EyeColor: this.EnumName(Color, this.Character.Head.EyeColor)
        };
    }

    /**
     * Gets a short gender message for the character, like "You are a girl.".
     */
    private GetShortGenderMessage() : string
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
    private GetBallCount(addNormal = false) : string
    {
        return addNormal && this.Character.Crotch.BallCount === 2
            ? '2 normal balls'
            : plural(this.Character.Crotch.BallCount, 'ball', 'balls');
    }

    /**
     * Gets the hair length. Dependent upon character height.
     * TODO: Make this dependent on character height. :)
     */
    private GetHairLength()
    {
        var len = this.Character.Head.HairLength;
        switch(true)
        {
            case len <= 0.2: return "You're bald - there's no hair up there!";
            case len <= 2: return "You have a buzz cut.";
            case len <= 4: return "You have short, boyish hair.";
            case len <= 7: return "You have a pixie cut, your hair just covers your ears.";
            case len <= 9: return "You have a short feminine cut, your hair doesn't quite reach your shoulders.";
            case len <= 12: return "You have shoulder-length hair.";
            case len <= 16: return "Your long hair runs down your back to your shoulderblades.";
            case len <= 26: return "Your long hair extends to the middle of your back.";
            case len <= 40: return "Your long hair extends all the way down to your butt.";
            case len <= 50: return "Your extremely long hair reaches all the way down to your knees.";
            case len <= 60: return "Your hair goes all the way down to the floor. Don't trip!";
        }
    }

    /**
     * Gets an enum's name by its value.
     * @param enumeration The enum to use as a lookup.
     * @param value The value to look up in the enum. 
     */
    private EnumName(enumeration : any, value : Color)
    {
        return enumeration[value];
    }
}
xrpg.service('CharacterVocabularyService', CharacterVocabularyService);