function mdFilter($sce : ng.ISCEService)
{
    return function(input : string)
    {
        var parser = new commonmark.Parser();
        var reader = new commonmark.HtmlRenderer();
        return $sce.trustAsHtml(reader.render(parser.parse(input)));
    }
}
xrpg.filter('md', ['$sce', mdFilter]);