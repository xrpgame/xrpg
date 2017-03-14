class RandomHelper
{
    /**
     * Gets a random number between two numbers.
     * @param start The smallest random number.
     * @param end The biggest random number.
     */
    static RandomInt (start : number, end : number) : number
    {
        return Math.floor(Math.random() * (end - start)) + start;
    }
}