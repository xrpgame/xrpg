class EncounterRepository
{
    private static PERCENT_ENCOUNTER_CHANCE = 66;

    static Encounters: IEncounterCollection = {
        "Forced Item Encounter": {
            Id: 1,
            BiomeTypes: [BiomeTypes.Forest, BiomeTypes.Kingdom],
            RunEncounter: async game =>
            {
                game.mapService.BlockAll();

                game.addDialogLine("You encounter a mystical, cloudy floating orb. \
                                It seems to want your attention, and won't let you leave until \
                                you interact with it.\r\n\r\n It offers you an item but you can't \
                                make out what it is. You have no choice but to consume it.");

                await game.presentPrompts([
                    {
                        Code: 'yes',
                        Label: "Consume the item"
                    }
                ]);

                var item = ItemRepository.GetRandomItem();
                
                game.replaceDialog(item.Apply(game.Character));

                game.addDialogLine(`\r\n\r\nAfter the changes are complete, the orb mysteriously vanishes,
                                and it would now appear that you are free to go.`);

                game.mapService.UnblockAll();
            },
        },
        
        "Optional Random Item Encounter": {
            Id: 2,
            BiomeTypes: [BiomeTypes.Forest, BiomeTypes.Plains, BiomeTypes.Kingdom, BiomeTypes.Desert],
            RunEncounter: async game => {
                game.mapService.BlockAll();

                const randItem = ItemRepository.GetRandomItem();

                game.addDialogLine(`You stumble across something lying on the ground.
                
You glance at it. The item reads: **${randItem.Name}**

You have a feeling that if you came back to this spot again, it wouldn't be here anymore.

What do you do?`);

                var response = await game.presentPrompts([
                    {
                        Code: 'yes',
                        Label: ItemRepository.GetAction(randItem, true) + " the item"
                    },
                    {
                        Code: 'ins',
                        Label: 'Inspect the ' + ItemType[randItem.Type].toLowerCase() + " closer"
                    },
                    {
                        Code: 'no',
                        Label: 'Leave the item be'
                    }
                ]);

                if (response == 'yes')
                {
                    game.replaceDialog(randItem.Apply(game.Character));
                }
                else if(response == 'ins')
                {
                    game.replaceDialog(`You pick the item up to inspect it closer. It appears to be a 
                                        type of ${ItemType[randItem.Type].toLowerCase()}.
                    
${randItem.Description}

What do you do?`);
                    var response2 = await game.presentPrompts([
                        {
                            Code: 'yes',
                            Label: ItemRepository.GetAction(randItem, true) + " the item"
                        },
                        {
                            Code: 'no',
                            Label: 'Leave the item'
                        }
                    ]);

                    if (response2 == 'yes')
                    {
                        game.replaceDialog(randItem.Apply(game.Character));
                    }
                    else
                    {
                        game.replaceDialog('You put the item back where you found it.')
                    }
                }
                else
                {
                    game.replaceDialog('You leave the item where it is and continue with your adventure.')
                }
                game.mapService.UnblockAll();
            }
        },

        "Sex Fairy Encounter": {
            Id: 3,
            BiomeTypes: [BiomeTypes.Forest],
            RunEncounter: async game =>
            {
                game.mapService.BlockAll();

                game.replaceDialog("You see a small fairy hovering at eye level. \
                                    You can't quite make out if it's a boy or girl fairy. \
                                    It's got a smirk on its face as you get closer to inspect it.")

                var pctChanceToRun = 10;

                var resp1 = await game.presentPrompts([
                    {
                        Code: 'a',
                        Label: 'Wait cautiously'
                    },
                    {
                        Code: 'b',
                        Label: 'Introduce yourself'
                    }
                ]);

                if (resp1 == 'b')
                {
                    game.replaceDialog('Before you can introduce yourself, the ');
                    pctChanceToRun += 20; // Increase chances for polite people :)
                } 
                else
                {
                    game.replaceDialog('The ')
                }
                game.addDialog("fairy flies down to your crotch and buzzes around for a moment, \
                                seemingly inspecting you. It then flies back up to your head, \
                                smiles, and ");
                
                if (CharacterHelper.GetSexType(game.Character) == SexType.None)
                {
                    game.addDialogLine("waves goodbye before disappearing with a cute \\*pop\\* noise. \
                                   \r\n\r\nYou assume since you only have a smooth mound and no sex \
                                   organs that the fairy didn't have any business with you.\r\n\r\n \
                                   You appear to be free to go.");
                    return;
                }

                game.addDialog('scrunches up its face as if concentrating on something.');

                var pronoun = '';
                var posessive = '';
                var proself = '';
                switch (CharacterHelper.GetSexType(game.Character))
                {
                    case SexType.Both:
                        game.addDialogLine("You then notice the fairy begins to sprout a proportionately \
                                       massive dick. As it flies around, waving it in the air, you can also \
                                       see a slit underneath the dick. The fairy now has both sets of sex \
                                       organs, matching your own.");
                        pronoun = 'It';
                        posessive = 'Its';
                        proself = 'Itself';
                        break;
                    case SexType.Male:
                        game.addDialogLine("You then notice something forming between the fairy's legs. \
                                        A small slit forms as the fairy spreads her legs slightly and smiles.");
                        pronoun = 'She';
                        posessive = 'Her';
                        proself = 'Herself';
                        break;
                    case SexType.Female:
                        game.addDialogLine("You then notice the fairy begins to sprout a proportionately \
                                        large dick between his legs. As he flies around, it swings lightly in the \
                                        air. He smiles at you.");
                        pronoun = 'He';
                        posessive = 'His';
                        proself = 'Himself';
                        break;
                }

                game.addDialogLine("You have a feeling that you know what the fairy wants with you. What do you do?");

                var resp2 = await game.presentPrompts([
                    {
                        Code: 'y',
                        Label: "Don't resist"
                    },
                    {
                        Code: 'n',
                        Label: "Resist"
                    }
                ]);

                if (resp2 == 'n')
                {
                    if (RandomHelper.RandomInt(0, 100) < pctChanceToRun)
                    {
                        game.replaceDialog("You were able to escape successfully. You are now free to move.");
                        game.mapService.UnblockAll();
                        return;
                    }

                    game.replaceDialog(`You try to resist, but the fairy is too strong. You are quickly
                                        overpowered by ${posessive.toLowerCase()} magical strength. 
                                        ${pronoun} pushes you to the ground.`);
                }
                else
                {
                    game.replaceDialog(`${pronoun} playfully presses you to the ground. You're willing to
                                        cooperate with whatever ${pronoun.toLowerCase()} wants to do to you.`)
                }

                game.addDialogLine(`${pronoun} then positions ${proself.toLowerCase()}
                                just above your crotch and begins to fuck you. You're not even sure how it 
                                all fits but it feels so good that you don't even care. You suspect that 
                                ${posessive.toLowerCase()} magical powers are only aiding in your pleasure.`);
                game.addDialog("Your eyes roll back into your head, overwhelmed with sexual pleasure. \
                                The sex continues for a few hours.");
                game.addDialogLine("...");
                await game.presentPrompts([
                    {
                        Code: 'a',
                        Label: 'You awaken...'
                    }
                ]);
                var rewardItem = ItemRepository.GetRandomItem(); // TODO: GetPositiveEffectItem
                game.replaceDialog("You wake and sit up, sweaty, sticky, and a little sore, \
                                    but somehow also relaxed and refreshed.");
                game.addDialog(`You notice a small item the fairy must have left behind as a small
                                token of gratitude. The bottle says **${rewardItem.Name}**.
                                Upon closer inspection, the label reads:\r\n\r\n*${rewardItem.Description}*
                                \r\n\r\nWhat do you do with it?`);

                var resp3 = await game.presentPrompts([
                    {
                        Code: 'y',
                        Label: `${ItemRepository.GetAction(rewardItem, true)} it`
                    },
                    {
                        Code: 'n',
                        Label: "Leave it here"
                    }
                ]);
                game.replaceDialog('');
                if (resp3 == 'y')
                {
                    game.addDialogLine(rewardItem.Apply(game.Character));
                }
                game.addDialogLine('It would seem you are free to leave.');
                game.mapService.UnblockAll();
            }
        }
    };

    static GetEncounterById(id: number): IEncounter
    {
        for (var i in this.Encounters)
        {
            if (this.Encounters[i].Id == id)
            {
                return this.Encounters[i];
            }
        }
    }

    static GetRandomEncounterForBiome(biome: IBiome): IEncounter
    {
        var biomeChoices: IEncounter[] = [];

        for (var i in this.Encounters)
        {
            var item = this.Encounters[i];
            if (item.BiomeTypes.indexOf(biome.Name) > -1)
            {
                biomeChoices.push(item);
            }
        }
        return (RandomHelper.RandomInt(0, 100) < this.PERCENT_ENCOUNTER_CHANCE)
            ? biomeChoices[RandomHelper.RandomInt(0, biomeChoices.length)]
            : null;
    }

}