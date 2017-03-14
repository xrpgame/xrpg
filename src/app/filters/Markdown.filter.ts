interface Window
{
    // Typings aren't loaing.....?
    markdownit : any;
}

function mdFilter($sce: ng.ISCEService)
{
    return function(input : string)
    {
        return $sce.trustAsHtml(md.renderInline(input));
    }
}
xrpg.filter('md', ['$sce', mdFilter]);
var md = window.markdownit();