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

                game.addDialog(`You encounter a mystical, cloudy floating orb.
It seems to want your attention, and won't let
you leave until you interact with it.

It offers you an item but you can't
make out what it is. You have no choice but to
consume it.`);

                await game.presentPrompts([
                    {
                        Code: 'yes',
                        Label: "Consume the item"
                    }
                ]);

                var item = ItemRepository.GetRandomItem();
                
                game.replaceDialog(item.Apply(game.Character));

                game.addDialog(`\r\n\r\nAfter the changes are complete, the orb mysteriously vanishes,
                                and it would now appear that you are free to go.`);

                game.mapService.UnblockAll();
            },
        },
        "Optional Random Item Encounter": {
            Id: 2,
            BiomeTypes: [BiomeTypes.Forest, BiomeTypes.Plains, BiomeTypes.Kingdom, BiomeTypes.Desert],
            RunEncounter: async game => {
                var item = ItemRepository.GetRandomItem();

                game.addDialog(`You stumble across something lying on the ground.
                
You glance at it. The item reads: **${item.Name}**

You have a feeling that if you came back to this spot again, it wouldn't be here anymore.

What do you do?`);

                var response = await game.presentPrompts([
                    {
                        Code: 'yes',
                        Label: ItemRepository.GetAction(item, true) + " the item"
                    },
                    {
                        Code: 'ins',
                        Label: 'Inspect the ' + ItemType[item.Type].toLowerCase() + " closer"
                    },
                    {
                        Code: 'no',
                        Label: 'Leave the item be'
                    }
                ]);

                if (response == 'yes')
                {
                    game.replaceDialog(item.Apply(game.Character));
                }
                else if(response == 'ins')
                {
                    game.replaceDialog(`You pick the item up to inspect it closer. It appears to be a type of ${ItemType[item.Type].toLowerCase()}.
                    
${item.Description}

What do you do?`);
                    var response2 = await game.presentPrompts([
                        {
                            Code: 'yes',
                            Label: ItemRepository.GetAction(item, true) + " the item"
                        },
                        {
                            Code: 'no',
                            Label: 'Leave the item'
                        }
                    ]);

                    if (response2 == 'yes')
                    {
                        game.replaceDialog(item.Apply(game.Character));
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
            }
        },

        "Female-ish Fairy Encounter": {
            Id: 3,
            BiomeTypes: [BiomeTypes.Forest],
            RunEncounter: async game =>
            {
                game.replaceDialog(`You see a small fairy hovering at eye level.
                                    You can\'t quite make out if it\'s a boy or girl fairy.
                                    It's got a smirk on its face as you get closer.`)

                var resp1 = await game.presentPrompts([
                    {
                        Code: 'a',
                        Label: 'Wait'
                    },
                    {
                        Code: 'b',
                        Label: 'Introduce yourself'
                    }
                ]);

                if (resp1 == 'b')
                {
                    game.replaceDialog('Before you can introduce yourself, the ')
                } 
                else
                {
                    game.replaceDialog('The ')
                }
                game.addDialog(`fairy flies down to your crotch and buzzes around for a moment, 
                                seemingly inspecting you. It then flies back up to your head, smiles, and `);
                
                if (CharacterHelper.GetSexType(game.Character) == SexType.None)
                {
                    game.addDialog('waves goodbye before disappearing with a cute \*pop\* noise.')
                    game.addDialog("\r\n\r\nYou assume since you only have a smooth mound and no sex organs that the fairy didn't have any business with you.");
                    return;
                }

                game.addDialog('scrunches up its face as if concentrating on something.');
                switch(CharacterHelper.GetSexType(game.Character))
                {
                    case SexType.Both:
                        game.addDialog("\r\n\r\nSuddenly, the fairy sprouts a proportionately massive [not finished]")
                }
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