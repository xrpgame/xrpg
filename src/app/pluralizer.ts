/**
 * Pluralizes a string.
 * @param count The count of items.
 * @param one The string for one item.
 * @param many The string for many items, or 0 items.
 * @param noNumber Set to true to not include the number/count in the output.
 */
function plural(count : number, one : string, many : string, noNumber = false) : string
{
    var ret = '';
    if (!noNumber)
    {
        ret += count + ' ';
    }
    return ret + (count === 1 ? one : many);
}

/**
 * Returns a string based on comparing two numbers.
 * @param current The current number.
 * @param target The target number.
 * @param smallerOrDifferent A string if the target is different, or if "larger" is provided, the smaller value.
 * @param same A string if the target is the same.
 * @param larger Optinoal. A string if the target is larger.
 */
function sizer(current : number, target : number, smallerOrDifferent : string, same : string, larger ?: string) : string
{
    if (current > target)
    {
        return smallerOrDifferent;
    }
    if (current < target)
    {
        return larger || smallerOrDifferent;
    }
    return same;
}