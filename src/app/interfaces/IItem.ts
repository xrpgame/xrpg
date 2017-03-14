interface IItem
{
    /**
     * Gets or sets the name of the item.
     */
    Name : string

    /**
     * Optional. Gets or sets the description of the item.
     */
    Description ?: string

    /**
     * Specifies the item type.
     */
    Type : ItemType

    /**
     * Applies the item to the character, and returns a message about what it did.
     * @param character The character to apply the item to.
     * @returns [ICharacter, string] The changed character and a Markdown message about it.
     */
    Apply(character : ICharacter) : string;
}

/**
 * Specifies the type of item. Affects how it is consumed.
 */
enum ItemType
{
    Potion,
    Food
}