class ItemRepository
{
    static Items : IItemCollection = {
        /**
         * Turns you pink.
         */
        "O.M.G.": {
            Name: "O.M.G.",
            Description: "It's a bottle of clear, shimmering liquid. The label has three large letters: 'O. M. G.'",
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
                return `You feel a tingling, stretching motion as your body grows taller. You now stand ${CharacterVocabularyService.GetHeight(c)} tall.`;
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
                c.Crotch.VaginaType = GenitalType.Plastic;

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
                            message += "You look down to see your penis slowly fade into a bright blue, shiny color. As you reach down to feel it, you realize that it has become a soft, malleable, stretchy rubber material. You can bend it and stretch it any which way, and it doesn't seem to hurt one bit... in fact, it's rather pleasurable, actually."
                            break;
                        case SexType.Female:
                            message += "You look down to witness your womanly mound slowly fade into a bright blue, shiny color. As you reach down to feel your slit, you realize that it has become a soft, malleable, stretchy rubber material. You stick your finger inside and find that you are extremely flexible and malleable, and that the sensation is rather pleasurable, actually."
                            break;
                    }
                }

                return message;
            }
        },

        /**
         * Makes you shorter.
         */
        "T-Stuff": {
            Name: "T-Stuff",
            Description: "A tiny, clear vial of liquid with just enough for a little taste.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                var minAmt = c.Body.HeightInches * 0.15;
                var maxAmt = c.Body.HeightInches * 0.30;
                var removeAmt = RandomHelper.RandomInt(Math.floor(minAmt), Math.floor(maxAmt));
                c.Body.HeightInches -= removeAmt;

                return `You feel yourself tingle, when suddenly, you notice the world getting slightly
                        larger around you. You have shrunk ${removeAmt} inches. You now stand
                        ${CharacterVocabularyService.GetHeight(c)} tall.`
            }
        },

        /**
         * Feminizing potion.
         */
        "Buxx": {
            Name: "Buxx",
            Description: "A wavy pink and purple bottle filled with shimmering, sparkling liquid.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                c.Head.HairLength += 6;
                c.Head.FaceShape = FaceShape.Round;
                var message = `You feel your body tingle all over as a number of changes make their way
                               through your body.\r\n\r\nYour hair lengthens by 6 inches and your face
                               softens and becomes more rounded and feminine. `;   

                if (c.Body.BodyTypeIndex > 0.7 && c.Body.BodyTypeIndex <= 0.9)
                {
                    c.Body.BodyTypeIndex += 0.1;
                    message += `Your body was already pretty feminine, but the potion has managed
                                to make it even more voluptuous and curvy. `;
                }
                else if(c.Body.BodyTypeIndex > 0)
                {
                    c.Body.BodyTypeIndex += 0.3;
                    message += `Your body's feminine features accentuate, becoming more curvy and
                                womanly. `
                }
                else
                {
                    c.Body.BodyTypeIndex = 0.3;
                    message += `Your body, previously masculine, morphs into a feminine shape, with
                                broad hips, fair skin, slender legs, a tiny waist, and minimal body hair.`;
                }
                message += "\r\n\r\n";
                if (c.Body.BreastCount == 0)
                {
                    c.Body.BreastCount = 2;
                    c.Body.BreastSize = BreastSize.B;
                    message += `You feel a pressure building in your chest, accentuated around your nipples.
                                You look down to see two round, flesh mounds expand outward from your chest.
                                You grow a pair of B-cup breasts. `;
                }
                else if (c.Body.BreastCount == 1)
                {
                    message += `You feel a pressure next to your only breast, as a second, identical breast
                                protrudes outward, matching the first one in size and shape perfectly. You
                                now have a normal set of two breasts. `
                }
                else if (c.Body.BreastCount != 2)
                {
                    c.Body.BreastCount = 2;
                    message += `Your additional breasts slowly shrink and fade back into your body, leaving
                                you with a normal set of two breasts. `
                }

                if (c.Body.ButtSize != ButtSize.Enormous)
                {
                    c.Body.ButtSize += 1;
                    message += `You also feel your butt tingle and expand slightly. There's a little
                                more jiggle in your step than before.`;
                }

                return message;
            }
        },

        /**
         * Breast reducer.
         */
        "Caver": {
            Name: "Caver",
            Description: "A plain metallic bottle with a rounded dent in it. The dent looks like it's there on purpose.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                if(c.Body.BreastCount == 0)
                {
                    return "Huh... nothing seemed to happen.";
                }

                var message = `You feel a tingling, pressure-like sensation in your chest.\r\n\r\n`;

                if (c.Body.BreastCount == 2)
                {
                    c.Body.BreastCount = 0;
                    c.Body.BreastSize = BreastSize.None;
                    message += "You look down to see your breasts slowly shrink as your chest becomes completely flat. You've lost your boobs."
                }
                else if (c.Body.BreastCount == 1)
                {
                    c.Body.BreastCount = 0;
                    c.Body.BreastSize = BreastSize.None;
                    message += "You look down to see your only breast slowly shrink as your chest becomes completely flat. You've lost your only boob."
                }
                else
                {
                    c.Body.BreastCount -= 2;
                    message += `You look down to see two of your breasts slowly shrink into your chest. You now have ${c.Body.BreastCount} boobs.`;
                }

                if (c.Body.BreastSize > 1)
                {
                    c.Body.BreastSize -= 1;
                    message += `\r\n\r\nYour breasts have also shrunk down to ${CharacterVocabularyService.EnumName(BreastSize, c.Body.BreastSize)} cup size.`
                }

                return message;
            }
        },

        /**
         * Butt enlarger.
         */
        "Donk": {
            Name: "Donk",
            Description: "An ordinary brownie. The label just reads 'Donk'. Smells fresh and delicious.",
            Type: ItemType.Food,
            Apply: c =>
            {
                var message = `You feel a swelling sensation in your butt... `;

                c.Body.ButtSize += 2;

                message += `After it subsides, you realize you now have a ${CharacterVocabularyService.EnumName(ButtSize, c.Body.ButtSize)} butt. It jiggles a little when you walk.`

                return message;
            }
        },

        /**
         * Cow-izer.
         */
        "Tipper": {
            Name: "Tipper",
            Description: "A black and white spotted cracker. Smells grainy, like an open field.",
            Type: ItemType.Food,
            Apply: c =>
            {
                c.Body.BreastCount = 4;
                c.Body.BreastSize = BreastSize.E;
                c.Body.SkinColor = Color.White;
                c.Body.Tail = TailType.Cow;

                c.Crotch.PenisType = GenitalType.Bovine;
                c.Crotch.PenisLength = 12;
                c.Crotch.PenisErectLength = 18;
                c.Crotch.PenisWidth = 2.5;
                c.Crotch.PenisColor = Color.Pink;
                c.Crotch.VaginaType = GenitalType.Bovine;
                c.Crotch.VaginaColor = Color.Pink;
                c.Crotch.VaginaDepth = 12;
                c.Crotch.VaginaDiameter = 3;

                c.Head.EarType = EarType.Cow;
                c.Head.FaceShape = FaceShape.Long;
                c.Head.TongueLength = 3;
                c.Head.HairColor = Color.Black;
                c.Head.HairLength = 6;

                var message = `You feel a strong sensation course through your body... 
                You grow 4 breasts with enormous, erect nipples.
                Your skin turns white, while your hair turns jet black.
                Your ears grow and become round and pointed.
                A thin tail sprouts from just above your ass, with a tuft of black hair at the end.
                Your face elongates, as does your tongue.`;

                var maleMessage = " Your penis grows into a massive 12\" bovine cock."
                var femaleMessage = " Your vagina widens just like a cow's, able to fit a huge bovine cock inside."

                switch (CharacterHelper.GetSexType(c))
                {
                    case SexType.Both:
                        message += maleMessage + femaleMessage;
                        break;
                    case SexType.Male:
                        message += maleMessage;
                        break;
                    case SexType.Female:
                        message += femaleMessage;
                        break;
                }

                return message;
            }
        },

        /**
         * Elf-izer.
         */
        "Twilight": {
            Name: "Twilight",
            Description: "A black bottle containing black liquid, with shimmering white specks inside. It almost looks like it's glowing.",
            Type: ItemType.Potion,
            Apply: c =>
            {
                c.Body.SkinColor = Color.Purple;
                c.Body.Tail = TailType.None;

                c.Crotch.PenisType = GenitalType.Human;
                c.Crotch.PenisColor = Color.Purple;
                c.Crotch.VaginaType = GenitalType.Human;
                c.Crotch.VaginaColor = Color.Purple;

                c.Head.EarType = EarType.VeryLongPointed;
                c.Head.EyeColor = Color.LightPurple;
                c.Head.HairColor = Color.DarkPurple;

                var message = `Your skin feels warm.
                You look at yourself and watch as your skin flashes and becomes a prominent shade of purple.
                Your scalp itches and tingles as your hair fades to a dark purple hue.
                You feel a pulling on the sides of your head. You reach up and feel your ears begin to elongate.
                They expand wildly, becoming rather large, pointed elf ears.
                Your eyes flash and refocus - your assume those have changed color, as well.`;

                var maleMessage = " Your penis has also turned a dark purple color."
                var femaleMessage = " Your vagina has also turned a dark purple color."

                switch (CharacterHelper.GetSexType(c))
                {
                    case SexType.Both:
                        message += maleMessage + femaleMessage;
                        break;
                    case SexType.Male:
                        message += maleMessage;
                        break;
                    case SexType.Female:
                        message += femaleMessage;
                        break;
                }

                return message;
            }
        },

        
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