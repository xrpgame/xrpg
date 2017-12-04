class ItemRepository
{
    static Items : IItemCollection = {
        /**
         * Turns you pink.
         */
        "Pink Stuff": {
            Name: "Pink Stuff",
            Description: "It's a bottle of... pink stuff. You should probably only drink this if you *really* like pink.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                c.Body.SkinColor = Color.HotPink;
                c.Crotch.VaginaColor = Color.HotPink;
                c.Crotch.PenisColor = Color.HotPink;
                c.Head.EyeColor = Color.HotPink;
                c.Head.HairColor = Color.HotPink;
                var message = 'Your entire body, including your hair and even your eyes, have turned a bright, hot pink.';
                switch (CharacterHelper.GetSexType(c))
                {
                    case SexType.Male:
                        message += " Your penis has also turned hot pink. You're not quite sure how to feel about that.";
                        break;
                    case SexType.Female:
                        message += " Your vagina has also turned hot pink.";
                        break;
                    case SexType.Both:
                        message += " Both your penis and vagina have also turned hot pink.";
                        break;
                }
                return message;
            }
        },

        /**
         * Turns you into a cat.
         */
        "Prowler": {
            Name: 'Prowler',
            Description: "A small black bottle with two eyes on the front.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                c.Body.Tail = TailType.Cat;
                c.Head.EarType = EarType.Cat;
                c.Head.EyeColor = Color.Yellow;
                c.Body.BreastCount = 12;

                var message = "You have grown cat ears and a cat tail, and your eyes have turned bright yellow. ";
                if (c.Body.BreastSize !== BreastSize.None)
                {
                    message += " You have also grown a set of 6 breasts on each side, each one slightly smaller than the pair above it.";
                }
                else
                {
                    message += " You have also grown a set of 6 nipples on each side.";
                }
                message += " *Meey-oww!*";
                return message;
            }
        },

        /**
         * Gives you a horse dick.
         */
        "Spotted Cookie": {
            Name: 'Spotted Cookie',
            Description: "It's a round, brown cookie with horns. Surprisingly fresh. Smells pretty good.",
            Type: ItemType.Food,
            Apply: c =>
            {
                var message = '';

                if (c.Crotch.PenisLength)
                {
                    message += `Your cock magically grows into an enormous brown horse dick.
                                It's 9 inches (16 inches when you're hard). You grab it with your
                                hand... you can barely grasp it. It must be 3 inches in diameter.`;
                }
                else
                {
                    message += `You feel a sensation between your legs, right where your pubic bone is.
                                You look down as the pressure builds, just as an enormous brown horse cock
                                shoots out from your crotch. It grows to a massive 9 inches. The sight
                                of it and the feeling of it growing arouses you, and your new cock becomes hard,
                                growing to a massive 16 inches. You grasp it firmly... it must be a good 3 inches
                                in diameter because it barely fits in your hand.`;
                }

                message += "\r\n\r\n";

                message += sizer(c.Crotch.BallCount, 2,
                    "You feel a shifting below your cock... You reach down there and realize that you now have 2 balls.",
                    "Your balls start tingling... you reach down to touch them."
                );

                message += sizer(c.Crotch.BallDiameter, 4,
                    "You suddenly feel them shrink to the size of baseballs. Not as big as they were, but still big enough to be annoying.",
                    "Your balls are already about the size of a bull's, so they stay the same size.",
                    "You feel them start to swell and grow... they expand to the size of baseballs, swinging freely between your legs."
                );

                c.Crotch.PenisLength = 9;
                c.Crotch.PenisErectLength = 16;
                c.Crotch.PenisWidth = 3;
                c.Crotch.PenisType = GenitalType.Bovine;
                c.Crotch.PenisColor = Color.Brown;
                
                c.Crotch.BallCount = 2;
                c.Crotch.BallDiameter = 4;
                return message;
            }
        },

        /** 
         * Adds a foot of height.
         */
        "Tower Soda": {
            Name: 'Tower Soda',
            Description: 'A bubbly green potion that simply reads "Tower Soda". You wonder what it tastes like.',
            Type: ItemType.Potion,
            Apply: c =>
            {
                c.Body.HeightInches += 12;
                return `You feel a tingling, stretching motion as your body grows taller. You now stand ${c.Body.HeightInches} inches tall.`;
            }
        },

        /**
         * Inverts your sex.
         */
        "The X": {
            Name: 'The X',
            Description: "It's a nondescrpit clear vial with a black 'X' on it.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                var st = CharacterHelper.GetSexType(c);
                switch (st)
                {
                    case SexType.Male:
                        c.Crotch.VaginaDepth = c.Crotch.PenisErectLength;
                        c.Crotch.VaginaDiameter = c.Crotch.PenisWidth;
                        c.Crotch.VaginaColor = c.Crotch.PenisColor;
                        c.Crotch.VaginaType = c.Crotch.PenisType;
                        c.Crotch.PenisLength = 0;
                        c.Crotch.PenisWidth = 0;
                        c.Crotch.BallCount = 0;
                        return `You feel a strong pulling in your crotch, and suddenly feel your ${c.Crotch.VaginaDepth}in penis magically invert, creating a ${c.Crotch.VaginaDepth}in deep vagina in its place. If you had any balls before, those are gone, too.`;
                    case SexType.Female:
                        c.Crotch.PenisErectLength = c.Crotch.VaginaDepth;
                        c.Crotch.PenisLength = Math.round(c.Crotch.VaginaDepth / 2);
                        c.Crotch.PenisWidth = c.Crotch.VaginaDepth;
                        c.Crotch.PenisColor = c.Crotch.VaginaColor;
                        c.Crotch.PenisType = c.Crotch.VaginaType;
                        c.Crotch.BallCount = 2;
                        c.Crotch.BallDiameter = 1;
                        c.Crotch.VaginaDepth = 0;
                        c.Crotch.VaginaDiameter = 0;
                        return `You feel a pressure building in the slit between your legs. Suddenly, you feel something pushing out of it. Looking down, you realize that your ${c.Crotch.PenisErectLength}in deep vagina has magically grown outwards into a ${c.Crotch.PenisErectLength}in erect cock in its place. Reaching below it with your hand, you realize you have also grown two regularly sized balls.`;
                    case SexType.Both:
                        c.Crotch.PenisLength = 0;
                        c.Crotch.PenisErectLength = 0;
                        c.Crotch.PenisWidth = 0;
                        c.Crotch.BallCount = 0;
                        c.Crotch.BallDiameter = 0;
                        c.Crotch.VaginaDepth = 0;
                        c.Crotch.VaginaDiameter = 0;
                        return `You feel both of your sex organs tingle. Suddenly, you feel your vagina pressing outwards, just as your cock shrinks and sucks into your pelvis. You are now sexless.`;
                    case SexType.None:
                        c.Crotch.PenisLength = 3;
                        c.Crotch.PenisErectLength = 6;
                        c.Crotch.PenisWidth = 1;
                        c.Crotch.BallCount = 2;
                        c.Crotch.BallDiameter = 1;
                        c.Crotch.VaginaDepth = 6;
                        c.Crotch.VaginaDiameter = 1;
                        return `You feel your sexless mound start to tingle. A small slit forms between your legs and you feel something pressing up inside of you. Simultaneously, you feel your pelvic bone tingle and expand, as you grow a penis and balls above your new slit. You now have both sets of sex organs.`;
                }
                return "Strangely enough, nothing happened. You're not sure why.";
            }
        },

        /**
         * Adds some inches to your hair.
         */
        "Locks": {
            Name: "Locks",
            Description: "A tall, slender clear bottle with multi-colored liquid inside that shimmers.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                var addLength = RandomHelper.RandomInt(8, 16);
                c.Head.HairLength += addLength;
                return `You feel a tugging sensation on your head, and notice your hair has grown ${addLength} inches.`;
            }
        },

        /**
         * Adds boobage.
         */
        "Mound": {
            Name: "Mound",
            Description: "A spherical bottle with a little nub on the front. Oddly, you drink from the nub on the front, not the top.",
            Type: ItemType.Potion,
            Apply: c => 
            {
                c.Body.BreastCount += 2;
                c.Body.BreastSize += 2;

                var message = `You feel a pressure building in your chest. You look down and see that two new breasts have emerged and formed on your chest.`;

                if (c.Body.BreastCount > 2)
                {
                    message += `\r\n\r\nYou now have ${c.Body.BreastCount} total breasts. Looks like a bra is out of the question.`;
                    message += `\r\n\r\nYou also notice that as your new breasts were growing, your existing ones (and the new ones) have grown to a ${BreastSize[c.Body.BreastSize]} cup.`;
                }
                else
                {
                    message += `\r\n\r\nYour new breasts appear to be ${BreastSize[c.Body.BreastSize]} cups.`
                }

                return message;
            }
        },

        /**
         * Makes you blue and rubbery.
         */
        "Blue #5": {
            Name: "Blue #5",
            Description: "The label on the bottle simply reads: \"Blue #5: Hope you like the color blue.\"",
            Type: ItemType.Potion,
            Apply: c =>
            {
                c.Head.HairColor = Color.LightBlue;
                c.Head.EyeColor = Color.Blue;
                c.Crotch.PenisColor = Color.Blue;
                c.Crotch.VaginaColor = Color.Blue;
                c.Crotch.PenisType = GenitalType.Plastic;

                var message = 'As you drink the potion, you feel your hair and eyes start to tingle pleasantly. You assume they have both turned a nice bluish tint.';

                if (CharacterHelper.GetSexType(c) != SexType.None)
                {
                    message += "\r\n\r\nYou also feel a distinct, yet odd sensation in your crotch. ";

                    switch (CharacterHelper.GetSexType(c))
                    {
                        case SexType.Both:
                            message += "You look down to see both your penis and vagina slowly fade into a bright blue, shiny color. As you reach down to feel your parts, you realize that your sex organs have become a soft, malleable, stretchy rubber material."
                            break;
                        case SexType.Male:
                            message += "You look down to see both your penis slowly fade into a bright blue, shiny color. As you reach down to feel it, you realize that it has become a soft, malleable, stretchy rubber material. You can bend it and stretch it any which way, and it doesn't seem to hurt one bit... in fact, it's rather pleasurable, actually."
                            break;
                        case SexType.Female:
                            message += "You look down to see both your womanly mound slowly fade into a bright blue, shiny color. As you reach down to feel your slit, you realize that it has become a soft, malleable, stretchy rubber material. You stick your finger inside and find that you are extremely flexible and malleable, and that the sensation is rather pleasurable, actually."
                            break;
                    }
                }

                return message;
            }
        }
    };

    static ItemCount(): number
    { 
        return Object.keys(this.Items).length;
    }

    static GetRandomItem(): IItem
    {
        return this.Items[Object.keys(this.Items)[RandomHelper.RandomInt(0, this.ItemCount())]];
    }

    static GetRandomItemFromSet(possibilities: IItem[]): IItem
    {
        return possibilities[RandomHelper.RandomInt(0, possibilities.length)];
    }

    static GetAction(item: IItem, capitalize: boolean): string
    {
        switch(item.Type)
        {
            case ItemType.Food:
                return capitalize ? "Eat" : "eat";
            case ItemType.Potion:
                return capitalize ? "Drink" : "drink";
            default:
                return capitalize ? "Consume" : "consume";
        }
    }
}