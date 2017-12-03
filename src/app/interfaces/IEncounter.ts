interface IEncounter
{
    Id: number
    BiomeTypes : string[]
    RunEncounter(game: GameController): Promise<any>
}

interface IEncounterCollection
{
    [encounterName: string]: IEncounter
}