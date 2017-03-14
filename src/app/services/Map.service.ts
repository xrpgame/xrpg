class MapService
{
    static $inject = [
        '$rootScope',
        'BiomeRepository'
    ];

    public Map : IMap;
    public Position : IVector = {
        x: -1,
        y: -1
    };

    constructor(private $rootScope : ng.IRootScopeService,
                private biomeRepository : BiomeRepository)
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

    public CanMoveUp() : boolean
    {
        return this.Position.x > 0;
    }
    public CanMoveDown() : boolean
    {
        return this.Position.x < this.Map.Size.x - 1;
    }
    public CanMoveLeft() : boolean
    {
        return this.Position.y > 0;
    }
    public CanMoveRight() : boolean
    {
        return this.Position.y < this.Map.Size.y - 1;
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

    // #Admin
    public RevealMap()
    {
        for (var i = 0; i < this.Map.Size.x; i++)
        {
            for (var j = 0; j < this.Map.Size.y; j++)
            {
                this.Map.Map[i][j].HasVisited = true;
            }
        }
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
                map[i][j] = <IMapCell> {
                    Biome: this.biomeRepository.GetBiomeByCoordinates(i / x, j / y),
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