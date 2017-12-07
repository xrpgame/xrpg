function trimFilter()
{
    return function(input : string)
    {
        if (!input) return;
        return input.trim();
    }
}
xrpg.filter('trim', [trimFilter]);
