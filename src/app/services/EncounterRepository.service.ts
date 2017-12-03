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

                var item = ItemRepository.GetRandomItemFromSet([
                    ItemRepository.Items["The X"],
                    ItemRepository.Items["Pink Stuff"]    
                ])
                
                game.replaceDialog(item.Apply(game.Character));

                game.addDialog(`After the changes are complete, the orb mysteriously vanishes,
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