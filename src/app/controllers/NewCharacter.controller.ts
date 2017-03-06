class NewCharacterController
{
    static $inject = [
        'CharacterService',
        'MapService',
        '$location'
    ];

    public newName : string;

    constructor(private characterService : CharacterService,
                private mapService : MapService,
                private $location : ng.ILocationService)
    {
        this.newName = '';
    }

    public boy() : void
    {
        this.mapService.GenerateMap();
        this.characterService.NewCharacter(this.newName, true);
        this.$location.url('/game');
    }
    public girl() : void
    {
        this.mapService.GenerateMap();
        this.characterService.NewCharacter(this.newName, false);
        this.$location.url('/game');
    }
}
xrpg.controller('newCharacterController', NewCharacterController);