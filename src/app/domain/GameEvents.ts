class GameEvents
{
    public static Character =
    {
        Changed: 'character.changed'
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