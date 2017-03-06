class MapService
{
    static $inject = [
        '$rootScope'
    ];

    public Map : IMap;
    public Position : IVector = {
        x: -1,
        y: -1
    };

    constructor(private $rootScope : ng.IRootScopeService)
    {
        this.LoadMap();
        if (!this.Map)
        {
            this.GenerateMap();
        }
    }

    public OnMapChanged()
    {
        this.$rootScope.$broadcast(GameEvents.Map.Changed, <IMapChangedEvent> {
            Map: this.Map,
            Position: this.Position
        });
    }

    public GenerateMap(w = 16, h = 16) : void
    {
        this.Map = this.NewMap(w, h);
        this.SetPos(0, 0);
        this.SaveMap();
        this.OnMapChanged();
    }

    public Move(direction : Direction) : boolean
    {
        var moved = false;
        switch (direction)
        {
            case Direction.Up:
                if (this.Position.x > 0)
                {
                    this.Position.x--;
                    moved = true;
                }
                break;
            case Direction.Down:
                if (this.Position.x < this.Map.Size.x - 1)
                {
                    this.Position.x++;
                    moved = true;
                }
                break;
            case Direction.Left:
                if (this.Position.y > 0)
                {
                    this.Position.y--;
                    moved = true;
                }
                break;
            case Direction.Right:
                if (this.Position.y < this.Map.Size.y - 1)
                {
                    this.Position.y++;
                    moved = true;
                }
                break;
        }
        if (moved)
        {
            this.Map.Map[this.Position.x][this.Position.y].HasVisited = true;
        }
        return moved;
    }

    private SetPos(x : number, y : number)
    {
        this.Position.x = x;
        this.Position.y = y;
        this.Map.Map[x][y].HasVisited = true;
        this.OnMapChanged();
    }

    private NewMap(x : number, y : number) : IMap
    {
        var map : IMapCell[][] = [];
        
        for (var i = 0; i < x; i++)
        {
            map[i] = [];
            for (var j = 0; j < y; j++)
            {
                map[i][j] = {
                    Biome: this.GetBiome(i, j, x, y),
                    HasVisited: false,
                    Encounter: {Name: "An Encounter"},
                    Item: null
                };
            }
        }

        return {
            Map: map,
            Size: {
                x: x,
                y: y
            }
        };
    }

    private GetBiome(x : number, y : number, w : number, h : number) : IBiome
    {
        // Q1, upper-left
        if (x < w / 2 && y < h / 2)
        {
            return {
                Name: 'Forest',
                Color: '#00CC11'
            };
        }
        // Q2, upper-right
        if (x <= w && y < h / 2)
        {
            return {
                Name: 'Desert',
                Color: '#CCCC00'
            };
        }
        // Q3, lower-left
        if (x < w / 2 && y <= h)
        {
            return {
                Name: 'Plains',
                Color: '#AADD00'
            };
        }
        // Q4, lower-left
        if (x <= w && y <= h)
        {
            return {
                Name: 'Kingdom',
                Color: '#44BBFF'
            };
        }

        return {
            Name: "Error",
            Color: '#FFCCCC'
        }
    }

    private SaveMap() : void
    {
        localStorage.setItem(StorageKeys.Map, JSON.stringify(this.Map));
    }

    private LoadMap() : void
    {
        try
        {
            var data = localStorage.getItem(StorageKeys.Map);
            if (data && data.length && data.trim()[0] === '{')
            {
                this.Map = JSON.parse(data);
            }
        }
        catch (e)
        {
            console.error('XRPG: Unable to load map from local storage. Data is missing or does not appear to be JSON.', e);
        }
    }
}
xrpg.service('MapService', MapService);