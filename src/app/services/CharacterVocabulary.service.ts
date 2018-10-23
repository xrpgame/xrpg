class CharacterVocabularyService
{
    private Character : ICharacter = null;

    public GetCharacterVocab(char : ICharacter) : ICharacterVocab
    {
        this.Character = char;

        return {
            ShortGenderMessage: this.GetShortGenderMessage(),

            HairColor: this.EnumName(Color, this.Character.Head.HairColor).toLowerCase(),
            HairLength: this.GetHairLength(),
            EyeColor: this.EnumName(Color, this.Character.Head.EyeColor).toLowerCase(),
            EarType: this.GetEarLength(),
            FaceType: this.GetFaceType(),
            TongueLength: this.GetTongueLength(),
            
            BodyType: this.GetBodyType(),
            Breasts: this.GetBreasts(),
            ButtSize: this.GetButtType(),
            Height: CharacterVocabularyService.GetHeight(this.Character),
            NumArms: this.GetArms(),
            SkinColor: `Your skin color is ${this.EnumName(Color, this.Character.Body.SkinColor).toLowerCase()}.`, // Todo
            Tail: this.Character.Body.Tail === TailType.None ? '' : "It's got a " + this.EnumName(TailType, this.Character.Body.Tail).toLowerCase() + ' tail protruding from it, as well.',

            BallCountMessage: this.GetBallCount(),
            Penis: this.GetPenis(),
            Vagina: this.GetVagina()
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
    private GetHairLength() : string
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

    private GetEarLength() : string
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

    private GetFaceType() : string
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

    private GetTongueLength() : string
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

    static GetHeight(c: ICharacter) : string
    {
        var feet = Math.floor(c.Body.HeightInches / 12);
        var inches = c.Body.HeightInches % 12;
        if(inches > 0)
        {
            return `${feet}ft ${inches}in`;
        }
        return `${feet}ft`;
    }

    private GetBodyType() : string
    {
        var t = this.Character.Body.BodyTypeIndex;
        switch (true)
        {
            case t < -1.0: return "Your body is extremely manly. Your muscles are toned and well-defined, you have large, square shoulders, a six-pack, and lots of body hair.";
            case t < -0.8: return "Your body is very manly. You have toned muscles and your stomach is flat. You have a decent amount of body hair.";
            case t < -0.6: return "Your body is definitely male. You have muscles and noticeable body hair.";
            case t < -0.4: return "Your body is male. You have noticeable muscles and body hair, and tall, defined shoulders.";
            case t < -0.2: return "Your body is slightly male. You have some muscle tone, and someone looking closely would notice your body hair.";
            case t < 0.0: return "Your body is ever so slightly male. Your muscle tone is very faint, and you have a very small amount of body hair.";
            case t == 0.0: return "Your body type is androgynous. You have no defining male or female characteristics one way or the other.";
            case t < 0.2: return "Your body is slightly feminine. Your body hair is thin and light, but noticeable, and your hips curve ever so slightly.";
            case t < 0.4: return "Your body is somewhat feminine. Your body hair is unnoticeable from afar, and your hips have a bit of a curve to them.";
            case t < 0.6: return "Your body is female. You have body hair that could be described as 'peach fuzz', and your hips and waist form a slight but pleasing hourglass shape.";
            case t < 0.8: return "Your body is definitely female. You have almost no body hair to speak of, your stomach is flat, your waist is small, and your hips form a definite hourglass shape.";
            case t <= 1.0: return "Your body is very feminine. You have no body hair whatsoever, your stomach is flat and toned, your waist is tiny, and your hourglass figure puts models to shame.";
            case t > 1.0: return "Your body is extremely feminine. You are completely hairless (except maybe your head), your waist is very tiny, your hips are enormous, and your hourglass figure will no doubt gather lots of attention.";
            default: "Your body type is unknown at this time. Maybe try finding a mirror or something...?"; 
        }
    }

    private GetButtType() : string
    {
        switch (this.Character.Body.ButtSize)
        {
            case ButtSize.Male:     return "Your butt is flat, toned, and manly.";
            case ButtSize.Flat:     return "Your butt is flat.";
            case ButtSize.Small:    return "Your butt is very small, it's almost flat.";
            case ButtSize.Perky:    return "Your butt is small and perky.";
            case ButtSize.Average:  return "Your butt is normal, it's got just the right padding to it.";
            case ButtSize.Large:    return "Your butt is pretty large, it's got a good amount of plump to it.";
            case ButtSize.Huge:     return "Your butt is huge, it's got a lot of padding to it.";
            case ButtSize.Massive:  return "Your butt is massive, it's plump and round. You have trouble fitting it into some clothes.";
            case ButtSize.Enormous: return "Your butt is absolutely enormous. When you sit, it feels like you're always sitting on a pillow. Most form-fitting clothes don't fit over your massive ass.";
        }
    }

    private GetBreasts() : string
    {
        var s = this.Character.Body.BreastCount;
        var cup = this.EnumName(BreastSize, this.Character.Body.BreastSize);
        switch (true)
        {
            case s <= 0: return "You don't have any breasts.";
            case s == 1: return `You have a single ${cup} cup breast centered on your chest.`;
            case s == 2: return `You have a pair of ${cup} cup breasts on your chest.`;
            case s == 3: return `You have three ${cup} cup breasts, all in a row on your chest.`;
            case s == 4: return `You have two pairs of ${cup} cup breasts, the second set right underneath the first.`;
            case s % 2 == 0: return `You have ${s / 2} pairs of ${cup} cup breasts running down your chest.`;
            case s % 2 == 1: return `You have ${(s - 1) / 2} pairs of ${cup} cup breasts running down your chest, with an extra one centered at the bottom.`;
            default: `You have ${s} ${cup} cup breasts.`;
        }
    }

    private GetArms() : string
    {
        var a = this.Character.Body.NumArms;
        switch (true)
        {
            case a == 0: return "You don't have any arms. Somehow, you manage to use stuff with your feet.";
            case a == 1: return ""; // Standard number of arms? Don't say anything. That's kinda weird.
            case a == 2: return "You have two sets of arms. Surprisingly, your brain doesn't have any problem controlling them.";
            case a == 3: return "You have three sets of arms. You have trouble fitting into most tops since there are only two arm holes.";
            default: return `You have ${a} sets of arms. That's a lot of arms! You probably won't fit into any tops with all those arms.`;
        }
    }

    private GetPenis() : string
    {
        // Condition for androgynous is here.
        if (this.Character.Crotch.PenisLength == 0
        && this.Character.Crotch.VaginaDepth == 0)
        {
            return "You have a smooth mound, with no sex organs. (You're not really sure how you're supposed to go to the bathroom...)";
        }

        if (this.Character.Crotch.PenisLength == 0) return '';

        var length = this.Character.Crotch.PenisLength;
        var eLength = this.Character.Crotch.PenisErectLength;
        var width = this.Character.Crotch.PenisWidth;

        var lengthMsg = 'You have a penis. ';
        switch (true)
        {
            case length < 2: lengthMsg += `It's very small (${length}in, ${eLength}in erect).`; break;
            case length < 4: lengthMsg += `It's relatively small (${length}in, ${eLength}in erect).`; break;
            case length < 5: lengthMsg += `It's slightly smaller than average (${length}in, ${eLength}in erect).`; break;
            case length < 7: lengthMsg += `It'sn average sized (${length}in, ${eLength}in erect).`; break;
            case length < 9: lengthMsg += `It's slightly larger than average (${length}in, ${eLength}in erect).`; break;
            case length < 11: lengthMsg += `It's rather large (${length}in, ${eLength}in erect).`; break;
            case length < 14: lengthMsg += `It's very large (${length}in, ${eLength}in erect).`; break;
            case length < 17: lengthMsg += `It's huge (${length}in, ${eLength}in erect)!`; break;
            default: lengthMsg += `It's *massive* (${length}in, ${eLength}in erect)!`; break;
        }

        var widthMsg = '';
        switch (true)
        {
            case width < 0.2: widthMsg = `It's very narrow - only ${width}in in diameter.`; break;
            case width < 0.4: widthMsg = `It's somewhat narrow, around ${width}in in diameter.`; break;
            case width < 0.7: widthMsg = `It's slightly thinner than normal, about ${width}in in diameter.`; break;
            case width < 1.2: widthMsg = `It's got a pretty normal girth, ${width}in in diameter or so.`; break;
            case width < 1.5: widthMsg = `It's a little on the thick side, ${width}in in diameter.`; break;
            case width < 2.5: widthMsg = `It's really thick, ${width}in in diameter.`; break;
            case width < 4: widthMsg = `It's ridiculously wide - ${width}in in diameter.`; break;
        }

        var materialMsg = this.Character.Crotch.PenisType == GenitalType.Human ? ''
                            : `It appears to be a ${this.EnumName(GenitalType, this.Character.Crotch.PenisType).toLowerCase()} penis.`;
        
        var colorMsg = this.Character.Crotch.PenisColor == Color.Tan ? ''
                        : `Your penis is ${this.EnumName(Color, this.Character.Crotch.PenisColor).toLowerCase()}.`;

        return `${lengthMsg} ${widthMsg} ${materialMsg} ${colorMsg}`;
    }

    private GetVagina() : string
    {
        if (this.Character.Crotch.VaginaDepth == 0) return '';

        var depth = this.Character.Crotch.VaginaDepth;
        var width = this.Character.Crotch.VaginaDiameter;

        var depthMsg = 'You have a vagina. ';
        switch (true)
        {
            case depth < 2: depthMsg += `It's very shallow (${depth}in deep). Not much will fit in there.`; break;
            case depth < 4: depthMsg += `It's relatively shallow  (${depth}in deep).`; break;
            case depth < 5: depthMsg += `It's slightly more shallow than normal (${depth}in deep).`; break;
            case depth < 7: depthMsg += `It's fairly average (${depth}in deep).`; break;
            case depth < 9: depthMsg += `It's slightly deeper than average (${depth}in deep).`; break;
            case depth < 11: depthMsg += `It's rather deep (${depth}in deep).`; break;
            case depth < 14: depthMsg += `It's very deep (${depth}in deep).`; break;
            case depth < 17: depthMsg += `It's extremely deep (${depth}in deep)!`; break;
            default: depthMsg += `It's *massive* (${depth}in deep)! You can fit almost *anything* in there.`; break;
        }

        var widthMsg = '';
        switch (true)
        {
            case width < 0.2: widthMsg = `It's very narrow - only ${width}in in diameter.`; break;
            case width < 0.4: widthMsg = `It's somewhat narrow, around ${width}in in diameter.`; break;
            case width < 0.7: widthMsg = `It's *slightly* more narrow than normal, about ${width}in in diameter.`; break;
            case width < 1.2: widthMsg = `It's got a pretty normal width, ${width}in in diameter or so.`; break;
            case width < 1.5: widthMsg = `It's a little on the wide side, ${width}in in diameter.`; break;
            case width < 2.5: widthMsg = `It's really wide, ${width}in in diameter.`; break;
            case width < 4: widthMsg = `It's ridiculously wide - ${width}in in diameter.`; break;
        }

        var materialMsg = this.Character.Crotch.VaginaType == GenitalType.Human ? ''
                            : `It appears to be a ${this.EnumName(GenitalType, this.Character.Crotch.VaginaType).toLowerCase()} vagina.`;
        
        var colorMsg = this.Character.Crotch.VaginaColor == Color.Tan ? ''
                        : `Your vagina is ${this.EnumName(Color, this.Character.Crotch.VaginaColor).toLowerCase()}.`;

        return `${depthMsg} ${widthMsg} ${materialMsg} ${colorMsg}`;    }

    /**
     * Gets an enum's name by its value.
     * @param enumeration The enum to use as a lookup.
     * @param value The value to look up in the enum. 
     */
    private EnumName(enumeration : any, value : any) : string
    {
        return CharacterVocabularyService.EnumName(enumeration, value);
    }

    /**
     * Gets an enum's name by its value.
     * @param enumeration The enum to use as a lookup.
     * @param value The value to look up in the enum. 
     */
    static EnumName(enumeration : any, value : any) : string
    {
        return (<string>enumeration[value]).replace(/([a-z])([A-Z])/, '$1 $2');
    }
}
xrpg.service('CharacterVocabularyService', CharacterVocabularyService);