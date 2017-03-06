interface IMap
{
    Map : IMapCell[][],
    Size : IVector
}

interface IMapCell
{
    HasVisited : boolean
    Biome : IBiome
    Encounter ?: IEncounter
    Item ?: IItem
}

interface IBiome
{
    Name : string
    Color: string
}

interface IEncounter
{

}

interface IItem
{
    Name : string
}