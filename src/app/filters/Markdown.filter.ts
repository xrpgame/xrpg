interface Window
{
    // Typings aren't loaing.....?
    markdownit : any;
}

function mdFilter($sce: ng.ISCEService)
{
    return function(input : string)
    {
        if (!input) return;
        return $sce.trustAsHtml(md.renderInline(input));
    }
}
xrpg.filter('md', ['$sce', mdFilter]);

function mdFullFilter($sce: ng.ISCEService)
{
    return function(input : string)
    {
        if (!input) return;
        return $sce.trustAsHtml(md.render(input));
    }
}
xrpg.filter('mdFull', ['$sce', mdFullFilter]);
var md = window.markdownit();