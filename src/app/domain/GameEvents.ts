class GameEvents
{
    public static Character =
    {
        Changed: 'character.changed',
        Moved: 'character.moved'
    };
    public static Map =
    {
        Changed: 'map.changed'
    };
}

interface ICharacterChangedEvent
{
    Character : ICharacter
    CharacterVocab : ICharacterVocab
}

interface IMapChangedEvent
{
    Map : IMap,
    Position: IVector
}

interface ICharacterMovedEvent
{
    NewPosX: number
    NewPosY: number
    MapCell: IMapCell
}