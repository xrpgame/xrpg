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
}

interface IBiome
{
    Name : string
    Color: string
}

interface IBiomeMap
{
    MinU : number
    MaxU : number
    MinV : number
    MaxV : number
    Biome : IBiome
}

interface IEncounter
{

}

interface IItem
{
    Name : string
}