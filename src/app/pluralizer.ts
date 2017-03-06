function plural(count : number, one : string, many : string, noNumber = false)
{
    var ret = '';
    if (!noNumber)
    {
        ret += count + ' ';
    }
    return ret + (count === 1 ? one : many);
}