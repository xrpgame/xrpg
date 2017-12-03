class BiomeRepository
{
    public Biomes = <IBiomeMap[]> [
        {
            MinU: 0,
            MaxU: 0.6,
            MinV: 0,
            MaxV: 0.6,
            Biome: {
                Name: BiomeTypes.Forest,
                Color: '#00CC11'
            }
        },
        {
            MinU: 0.4,
            MaxU: 1,
            MinV: 0,
            MaxV: 0.6,
            Biome: {
                Name: BiomeTypes.Desert,
                Color: '#CCCC00'
            }
        },
        {
            MinU: 0,
            MaxU: 0.6,
            MinV: 0.4,
            MaxV: 1,
            Biome: {
                Name: BiomeTypes.Plains,
                Color: '#AADD00'
            }
        },
        {
            MinU: 0.4,
            MaxU: 1,
            MinV: 0.4,
            MaxV: 1,
            Biome: {
                Name: BiomeTypes.Kingdom,
                Color: '#44BBFF'
            }
        }
    ];

    public GetBiomeByCoordinates(u : number, v : number) : IBiome
    {
        var possibleBiomes : IBiome[] = [];
        for (var i = 0; i < this.Biomes.length; i++)
        {
            if(u >= this.Biomes[i].MinU && u <= this.Biomes[i].MaxU
            && v >= this.Biomes[i].MinV && v <= this.Biomes[i].MaxV)
            {
                possibleBiomes.push(this.Biomes[i].Biome);
            }
        }
        return possibleBiomes[RandomHelper.RandomInt(0, possibleBiomes.length)];
    }
}
xrpg.service('BiomeRepository', BiomeRepository);