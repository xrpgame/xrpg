class GameEvents
{
    public static Character =
    {
        Changed: 'character.changed'
    }
}

interface ICharacterChangedEvent
{
    Character : ICharacter
    CharacterVocab : ICharacterVocab
}