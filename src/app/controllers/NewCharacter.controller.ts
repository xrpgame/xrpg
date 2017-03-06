class NewCharacterController
{
    static $inject = [
        'CharacterService',
        '$location'
    ];

    public newName : string;

    constructor(private characterService : CharacterService,
                private $location : ng.ILocationService)
    {
        this.newName = '';
    }

    public boy() : void
    {
        this.characterService.NewCharacter(this.newName, true);
        this.$location.url('/game');
    }
    public girl() : void
    {
        this.characterService.NewCharacter(this.newName, false);
        this.$location.url('/game');
    }
}
xrpg.controller('newCharacterController', NewCharacterController);