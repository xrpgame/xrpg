/**
 * Contains helper methods for checking various properties on a character.
 */
class CharacterHelper
{
    /**
     * Gets the sex type of this character.
     * @param c The character to check.
     */
    static GetSexType(c : ICharacter) : SexType
    {
        if (c.Crotch.PenisLength && c.Crotch.VaginaDepth)
        {
            return SexType.Both;
        }
        if (c.Crotch.PenisLength)
        {
            return SexType.Male;
        }
        if (c.Crotch.VaginaDepth)
        {
            return SexType.Female;
        }
        return SexType.None;
    }
}