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
            EyeColor: this.EnumName(Color, this.Character.Head.EyeColor),
            EarType: this.GetEarLength(),
            FaceType: this.GetFaceType(),
            TongueLength: this.GetTongueLength()
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

    private GetEarLength()
    {
        switch(this.Character.Head.EarType)
        {
            case EarType.None: return "You have no ears, just holes in the side of your head.";
            case EarType.Human: return "You have normal, human ears.";
            case EarType.Cat: return "You have furry, pointed cat ears on top of your head. You can also hear *really* well.";
            case EarType.Dog: return "You have floppy fuzzy dog ears that dangle off the top of your head.";
            case EarType.SlightlyPointed: return "You have slightly pointed ears... sort of like a Vulcan.";
            case EarType.Pointed: return "You have pointed ears.";
            case EarType.LongPointed: return "You have long, pointed ears.";
            case EarType.VeryLongPointed: return "You have *very* long, pointed ears, like an Elf.";
        }
    }

    private GetFaceType()
    {
        var shape = this.Character.Head.FaceShape;
        switch (this.Character.Head.FaceType)
        {
            case FaceType.VeryFeminine: return `You have a ${this.EnumName(FaceShape, shape).toLowerCase()}, very feminine face.`;
            case FaceType.Feminine: return `You have a ${this.EnumName(FaceShape, shape).toLowerCase()}, slightly feminine face.`;
            case FaceType.Neutral: return `You have a ${this.EnumName(FaceShape, shape).toLowerCase()}, neutral face. You could pass for either sex.`;
            case FaceType.Masculine: return `You have a ${this.EnumName(FaceShape, shape).toLowerCase()}, slightly masculine face.`;
            case FaceType.VeryMasculine: return `You have a ${this.EnumName(FaceShape, shape).toLowerCase()}, very masculine face.`;
        }
    }

    private GetTongueLength()
    {
        var len = this.Character.Head.TongueLength;
        switch (true)
        {
            case len < 0.1: return "You don't have a tongue!";
            case len < 3: return "You have a smaller than average tongue. Probably not good for pleasuring anything.";
            case len < 5: return "You have an average tongue.";
            case len < 7: return "You have a slightly larger than average tongue. It works to your advantage when *licking things.*";
            default: return `You have a ridiculously large tongue (${len} in)! You must be *really good* at oral.`;
        }
    }

    /**
     * Gets an enum's name by its value.
     * @param enumeration The enum to use as a lookup.
     * @param value The value to look up in the enum. 
     */
    private EnumName(enumeration : any, value : any) : string
    {
        return enumeration[value];
    }
}
xrpg.service('CharacterVocabularyService', CharacterVocabularyService);