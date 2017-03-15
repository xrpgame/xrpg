var xrpg = angular.module('xrpg', ['ngRoute']);
/* Interpolation debugging */
/*
xrpg.config(function($provide){
    $provide.decorator("$interpolate", function($delegate){
 
        var interpolateWrap = function(){
            var interpolationFn = $delegate.apply(this, arguments);
            if(interpolationFn) {
                return interpolationFnWrap(interpolationFn, arguments);
            }
        };
 
        var interpolationFnWrap = function(interpolationFn, interpolationArgs){
            return function(){
                var result = interpolationFn.apply(this, arguments);
                var log = result ? console.log : console.warn;
                log.call(console, "interpolation of  " + interpolationArgs[0].trim(),
                                  ":", result.trim());
                return result;
            };
        };
 
        angular.extend(interpolateWrap, $delegate);
        return interpolateWrap;
 
    });
});
*/ 
var RouteConfig = (function () {
    function RouteConfig($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
            .when('/game', {
            templateUrl: 'app/templates/game.html',
            controller: 'gameController',
            controllerAs: 'gc'
        })
            .when('/newCharacter', {
            templateUrl: 'app/templates/newCharacter.html',
            controller: 'newCharacterController',
            controllerAs: 'ncc'
        })
            .otherwise('/');
    }
    return RouteConfig;
}());
RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
xrpg.config(RouteConfig);
/**
 * Pluralizes a string.
 * @param count The count of items.
 * @param one The string for one item.
 * @param many The string for many items, or 0 items.
 * @param noNumber Set to true to not include the number/count in the output.
 */
function plural(count, one, many, noNumber) {
    if (noNumber === void 0) { noNumber = false; }
    var ret = '';
    if (!noNumber) {
        ret += count + ' ';
    }
    return ret + (count === 1 ? one : many);
}
/**
 * Returns a string based on comparing two numbers.
 * @param current The current number.
 * @param target The target number.
 * @param smallerOrDifferent A string if the target is different, or if "larger" is provided, the smaller value.
 * @param same A string if the target is the same.
 * @param larger Optinoal. A string if the target is larger.
 */
function sizer(current, target, smallerOrDifferent, same, larger) {
    if (current > target) {
        return smallerOrDifferent;
    }
    if (current < target) {
        return larger || smallerOrDifferent;
    }
    return same;
}
var CharacterSheetController = (function () {
    function CharacterSheetController(charService, $rootScope) {
        var _this = this;
        this.charService = charService;
        this.$rootScope = $rootScope;
        this.Character = null;
        this.Vocab = null;
        $rootScope.$on(GameEvents.Character.Changed, function (e, data) {
            _this.Character = data.Character;
            _this.Vocab = data.CharacterVocab;
        });
        charService.OnCharacterChanged();
    }
    return CharacterSheetController;
}());
CharacterSheetController.$inject = [
    'CharacterService',
    '$rootScope'
];
xrpg.controller('CharacterSheetController', CharacterSheetController);
var GameController = (function () {
    function GameController(charService, mapService, $rootScope, $location) {
        var _this = this;
        this.charService = charService;
        this.mapService = mapService;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.Character = null;
        this.CharacterVocab = null;
        this.Map = null;
        this.ShowCharacterSheet = false;
        this.ShowMap = false;
        this.EnableAdminControls = true;
        $rootScope.$on(GameEvents.Character.Changed, function (e, data) {
            _this.Character = data.Character;
            _this.CharacterVocab = data.CharacterVocab;
        });
        $rootScope.$on(GameEvents.Map.Changed, function (e, data) {
            _this.Map = data.Map;
        });
        this.charService.OnCharacterChanged();
        this.mapService.OnMapChanged();
    }
    GameController.prototype.toggleCharacterSheet = function () {
        this.ShowCharacterSheet = !this.ShowCharacterSheet;
    };
    GameController.prototype.toggleMap = function () {
        this.ShowMap = !this.ShowMap;
    };
    GameController.prototype.moveUp = function () {
        this.mapService.Move(Direction.Up);
    };
    GameController.prototype.moveLeft = function () {
        this.mapService.Move(Direction.Left);
    };
    GameController.prototype.moveRight = function () {
        this.mapService.Move(Direction.Right);
    };
    GameController.prototype.moveDown = function () {
        this.mapService.Move(Direction.Down);
    };
    GameController.prototype.canMoveUp = function () {
        return this.mapService.CanMoveUp();
    };
    GameController.prototype.canMoveDown = function () {
        return this.mapService.CanMoveDown();
    };
    GameController.prototype.canMoveLeft = function () {
        return this.mapService.CanMoveLeft();
    };
    GameController.prototype.canMoveRight = function () {
        return this.mapService.CanMoveRight();
    };
    // Admin Stuff
    GameController.prototype.revealMap = function () {
        this.mapService.RevealMap();
    };
    GameController.prototype.startOver = function () {
        this.$location.url('/newCharacter');
    };
    return GameController;
}());
GameController.$inject = [
    'CharacterService',
    'MapService',
    '$rootScope',
    '$location'
];
xrpg.controller('gameController', GameController);
var HomeController = (function () {
    function HomeController() {
        // Do something with scope...?
    }
    return HomeController;
}());
HomeController.$inject = [];
xrpg.controller('homeController', HomeController);
var MapController = (function () {
    function MapController(mapService, $rootScope) {
        var _this = this;
        this.mapService = mapService;
        this.$rootScope = $rootScope;
        this.Map = null;
        this.Position = null;
        $rootScope.$on(GameEvents.Map.Changed, function (e, data) {
            _this.Map = data.Map;
            _this.Position = data.Position;
        });
        this.mapService.OnMapChanged();
    }
    return MapController;
}());
MapController.$inject = [
    'MapService',
    '$rootScope'
];
xrpg.controller('MapController', MapController);
var NewCharacterController = (function () {
    function NewCharacterController(characterService, mapService, $location) {
        this.characterService = characterService;
        this.mapService = mapService;
        this.$location = $location;
        this.newName = '';
    }
    NewCharacterController.prototype.boy = function () {
        this.mapService.GenerateMap();
        this.characterService.NewCharacter(this.newName, true);
        this.$location.url('/game');
    };
    NewCharacterController.prototype.girl = function () {
        this.mapService.GenerateMap();
        this.characterService.NewCharacter(this.newName, false);
        this.$location.url('/game');
    };
    return NewCharacterController;
}());
NewCharacterController.$inject = [
    'CharacterService',
    'MapService',
    '$location'
];
xrpg.controller('newCharacterController', NewCharacterController);
var GameEvents = (function () {
    function GameEvents() {
    }
    return GameEvents;
}());
GameEvents.Character = {
    Changed: 'character.changed'
};
GameEvents.Map = {
    Changed: 'map.changed'
};
var StorageKeys = (function () {
    function StorageKeys() {
    }
    return StorageKeys;
}());
StorageKeys.Character = 'xrpg.characterData';
StorageKeys.Map = 'xrpg.mapData';
function mdFilter($sce) {
    return function (input) {
        return $sce.trustAsHtml(md.renderInline(input));
    };
}
xrpg.filter('md', ['$sce', mdFilter]);
var md = window.markdownit();
/**
 * Contains helper methods for checking various properties on a character.
 */
var CharacterHelper = (function () {
    function CharacterHelper() {
    }
    /**
     * Gets the sex type of this character.
     * @param c The character to check.
     */
    CharacterHelper.GetSexType = function (c) {
        if (c.Crotch.PenisLength && c.Crotch.VaginaDepth) {
            return SexType.Both;
        }
        if (c.Crotch.PenisLength) {
            return SexType.Male;
        }
        if (c.Crotch.VaginaDepth) {
            return SexType.Female;
        }
        return SexType.None;
    };
    return CharacterHelper;
}());
var RandomHelper = (function () {
    function RandomHelper() {
    }
    /**
     * Gets a random number between two numbers.
     * @param start The smallest random number.
     * @param end The biggest random number.
     */
    RandomHelper.RandomInt = function (start, end) {
        return Math.floor(Math.random() * (end - start)) + start;
    };
    return RandomHelper;
}());
/* Interfaces for Attributes */
/* Enums */
/**
 * Specifies the color of anything (hair, eyes, etc).
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["DarkRed"] = 1] = "DarkRed";
    Color[Color["Orange"] = 2] = "Orange";
    Color[Color["LightOrange"] = 3] = "LightOrange";
    Color[Color["Yellow"] = 4] = "Yellow";
    Color[Color["LightYellow"] = 5] = "LightYellow";
    Color[Color["Green"] = 6] = "Green";
    Color[Color["LightGreen"] = 7] = "LightGreen";
    Color[Color["DarkGreen"] = 8] = "DarkGreen";
    Color[Color["Blue"] = 9] = "Blue";
    Color[Color["LightBlue"] = 10] = "LightBlue";
    Color[Color["DarkBlue"] = 11] = "DarkBlue";
    Color[Color["Purple"] = 12] = "Purple";
    Color[Color["LightPurple"] = 13] = "LightPurple";
    Color[Color["DarkPurple"] = 14] = "DarkPurple";
    Color[Color["Pink"] = 15] = "Pink";
    Color[Color["LightPink"] = 16] = "LightPink";
    Color[Color["HotPink"] = 17] = "HotPink";
    Color[Color["DarkPink"] = 18] = "DarkPink";
    Color[Color["Hazel"] = 19] = "Hazel";
    Color[Color["Brown"] = 20] = "Brown";
    Color[Color["LightBrown"] = 21] = "LightBrown";
    Color[Color["DarkBrown"] = 22] = "DarkBrown";
    Color[Color["Black"] = 23] = "Black";
    Color[Color["Teal"] = 24] = "Teal";
    Color[Color["LightTeal"] = 25] = "LightTeal";
    Color[Color["DarkTeal"] = 26] = "DarkTeal";
    Color[Color["Tan"] = 27] = "Tan";
    Color[Color["DarkTan"] = 28] = "DarkTan";
    Color[Color["White"] = 29] = "White";
    Color[Color["PaleWhite"] = 30] = "PaleWhite";
    Color[Color["Gray"] = 31] = "Gray";
    Color[Color["DarkGray"] = 32] = "DarkGray";
    Color[Color["LightGray"] = 33] = "LightGray";
    Color[Color["Silver"] = 34] = "Silver";
    Color[Color["DarkSilver"] = 35] = "DarkSilver";
    Color[Color["Gold"] = 36] = "Gold";
    Color[Color["DarkGold"] = 37] = "DarkGold";
    Color[Color["LightGold"] = 38] = "LightGold";
})(Color || (Color = {}));
/**
 * Specifies the face type / shape.
 */
var FaceType;
(function (FaceType) {
    FaceType[FaceType["VeryMasculine"] = 0] = "VeryMasculine";
    FaceType[FaceType["Masculine"] = 1] = "Masculine";
    FaceType[FaceType["Neutral"] = 2] = "Neutral";
    FaceType[FaceType["Feminine"] = 3] = "Feminine";
    FaceType[FaceType["VeryFeminine"] = 4] = "VeryFeminine";
})(FaceType || (FaceType = {}));
/**
 * Specifies the overall shape of the face.
 */
var FaceShape;
(function (FaceShape) {
    FaceShape[FaceShape["Round"] = 0] = "Round";
    FaceShape[FaceShape["Square"] = 1] = "Square";
    FaceShape[FaceShape["Long"] = 2] = "Long";
    FaceShape[FaceShape["Heart-Shaped"] = 3] = "Heart-Shaped";
})(FaceShape || (FaceShape = {}));
/**
 * Specifies the ear type.
 */
var EarType;
(function (EarType) {
    EarType[EarType["None"] = 0] = "None";
    EarType[EarType["Human"] = 1] = "Human";
    EarType[EarType["SlightlyPointed"] = 2] = "SlightlyPointed";
    EarType[EarType["Pointed"] = 3] = "Pointed";
    EarType[EarType["LongPointed"] = 4] = "LongPointed";
    EarType[EarType["VeryLongPointed"] = 5] = "VeryLongPointed";
    EarType[EarType["Dog"] = 6] = "Dog";
    EarType[EarType["Cat"] = 7] = "Cat";
})(EarType || (EarType = {}));
/**
 * Specifies any type of material for a part of the body.
 */
var GenitalType;
(function (GenitalType) {
    GenitalType[GenitalType["Human"] = 0] = "Human";
    GenitalType[GenitalType["Plastic"] = 1] = "Plastic";
    GenitalType[GenitalType["Equine"] = 2] = "Equine";
    GenitalType[GenitalType["Bovine"] = 3] = "Bovine";
    GenitalType[GenitalType["Reptilian"] = 4] = "Reptilian";
})(GenitalType || (GenitalType = {}));
/**
 * Specifies an extremity type (hand/foot).
 */
var ExtremityType;
(function (ExtremityType) {
    ExtremityType[ExtremityType["Human"] = 0] = "Human";
    ExtremityType[ExtremityType["Paw"] = 1] = "Paw";
    ExtremityType[ExtremityType["Claw"] = 2] = "Claw";
})(ExtremityType || (ExtremityType = {}));
var BreastSize;
(function (BreastSize) {
    BreastSize[BreastSize["None"] = 0] = "None";
    BreastSize[BreastSize["A"] = 1] = "A";
    BreastSize[BreastSize["B"] = 2] = "B";
    BreastSize[BreastSize["C"] = 3] = "C";
    BreastSize[BreastSize["D"] = 4] = "D";
    BreastSize[BreastSize["DD"] = 5] = "DD";
    BreastSize[BreastSize["E"] = 6] = "E";
    BreastSize[BreastSize["EE"] = 7] = "EE";
    BreastSize[BreastSize["F"] = 8] = "F";
    BreastSize[BreastSize["FF"] = 9] = "FF";
    BreastSize[BreastSize["G"] = 10] = "G";
    BreastSize[BreastSize["H"] = 11] = "H";
    BreastSize[BreastSize["I"] = 12] = "I";
    BreastSize[BreastSize["J"] = 13] = "J";
})(BreastSize || (BreastSize = {}));
var ButtSize;
(function (ButtSize) {
    ButtSize[ButtSize["Male"] = 0] = "Male";
    ButtSize[ButtSize["Flat"] = 1] = "Flat";
    ButtSize[ButtSize["Small"] = 2] = "Small";
    ButtSize[ButtSize["Perky"] = 3] = "Perky";
    ButtSize[ButtSize["Average"] = 4] = "Average";
    ButtSize[ButtSize["Large"] = 5] = "Large";
    ButtSize[ButtSize["Huge"] = 6] = "Huge";
    ButtSize[ButtSize["Massive"] = 7] = "Massive";
    ButtSize[ButtSize["Enormous"] = 8] = "Enormous";
})(ButtSize || (ButtSize = {}));
var SexType;
(function (SexType) {
    SexType[SexType["None"] = 0] = "None";
    SexType[SexType["Male"] = 1] = "Male";
    SexType[SexType["Female"] = 2] = "Female";
    SexType[SexType["Both"] = 3] = "Both";
})(SexType || (SexType = {}));
var TailType;
(function (TailType) {
    TailType[TailType["None"] = 0] = "None";
    TailType[TailType["Dog"] = 1] = "Dog";
    TailType[TailType["Cat"] = 2] = "Cat";
    TailType[TailType["Dragon"] = 3] = "Dragon";
    TailType[TailType["Bunny"] = 4] = "Bunny";
    TailType[TailType["Pig"] = 5] = "Pig";
})(TailType || (TailType = {}));
/**
 * Specifies the type of item. Affects how it is consumed.
 */
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Potion"] = 0] = "Potion";
    ItemType[ItemType["Food"] = 1] = "Food";
})(ItemType || (ItemType = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var BiomeRepository = (function () {
    function BiomeRepository() {
        this.Biomes = [
            {
                MinU: 0,
                MaxU: 0.6,
                MinV: 0,
                MaxV: 0.6,
                Biome: {
                    Name: 'Forest',
                    Color: '#00CC11'
                }
            },
            {
                MinU: 0.4,
                MaxU: 1,
                MinV: 0,
                MaxV: 0.6,
                Biome: {
                    Name: 'Desert',
                    Color: '#CCCC00'
                }
            },
            {
                MinU: 0,
                MaxU: 0.6,
                MinV: 0.4,
                MaxV: 1,
                Biome: {
                    Name: 'Plains',
                    Color: '#AADD00'
                }
            },
            {
                MinU: 0.4,
                MaxU: 1,
                MinV: 0.4,
                MaxV: 1,
                Biome: {
                    Name: 'Kingdom',
                    Color: '#44BBFF'
                }
            }
        ];
    }
    BiomeRepository.prototype.GetBiomeByCoordinates = function (u, v) {
        var possibleBiomes = [];
        for (var i = 0; i < this.Biomes.length; i++) {
            if (u >= this.Biomes[i].MinU && u <= this.Biomes[i].MaxU
                && v >= this.Biomes[i].MinV && v <= this.Biomes[i].MaxV) {
                possibleBiomes.push(this.Biomes[i].Biome);
            }
        }
        return possibleBiomes[RandomHelper.RandomInt(0, possibleBiomes.length)];
    };
    return BiomeRepository;
}());
xrpg.service('BiomeRepository', BiomeRepository);
var CharacterService = (function () {
    function CharacterService(characterMaker, characterVocab, $rootScope) {
        this.characterMaker = characterMaker;
        this.characterVocab = characterVocab;
        this.$rootScope = $rootScope;
        this.Character = {
            Name: null,
            Head: {},
            Body: {},
            Crotch: {}
        };
        this.LoadCharacter();
    }
    /**
     * Starts a new character, and uses the CharacterMakerService to generate a new character.
     * @param name The name of the character.
     * @param isMale Whether or not to start the character as a male or female.
     */
    CharacterService.prototype.NewCharacter = function (name, isMale) {
        this.Character = this.characterMaker.MakeCharacter(isMale);
        this.Character.Name = name;
        this.OnCharacterChanged();
    };
    /**
     * Fires the character.changed event.
     */
    CharacterService.prototype.OnCharacterChanged = function () {
        this.$rootScope.$broadcast(GameEvents.Character.Changed, {
            Character: this.Character,
            CharacterVocab: this.characterVocab.GetCharacterVocab(this.Character)
        });
        this.SaveCharacter();
    };
    CharacterService.prototype.SaveCharacter = function () {
        localStorage.setItem(StorageKeys.Character, JSON.stringify(this.Character));
    };
    CharacterService.prototype.LoadCharacter = function () {
        try {
            var data = localStorage.getItem(StorageKeys.Character);
            if (data && data.length && data.trim()[0] === '{') {
                this.Character = JSON.parse(data);
                this.OnCharacterChanged();
            }
        }
        catch (e) {
            console.error('XRPG: Unable to load character from local storage. Data is missing or does not appear to be JSON.', e);
        }
    };
    return CharacterService;
}());
CharacterService.$inject = [
    'CharacterMakerService',
    'CharacterVocabularyService',
    '$rootScope'
];
xrpg.service('CharacterService', CharacterService);
/**
 * Service that allows the creation of default characters.
 */
var CharacterMakerService = (function () {
    function CharacterMakerService() {
    }
    CharacterMakerService.prototype.MakeCharacter = function (isMale) {
        var baseChar = {
            Name: null,
            Head: {
                EarType: EarType.Human,
                EyeColor: Color.Brown,
                FaceShape: null,
                FaceType: null,
                TongueLength: 4,
                HairColor: null,
                HairLength: 0 //
            },
            Body: {
                BodyTypeIndex: 0,
                HeightInches: 0,
                NumArms: 1,
                SkinColor: Color.Tan,
                BreastCount: 2,
                BreastSize: null,
                ButtSize: null,
                Tail: TailType.None
            },
            Crotch: null
        };
        if (isMale) {
            // New Male Character
            baseChar.Head.FaceShape = FaceShape.Square;
            baseChar.Head.FaceType = FaceType.Masculine;
            baseChar.Head.HairColor = Color.Brown;
            baseChar.Head.HairLength = 1;
            baseChar.Body.BodyTypeIndex = -0.5;
            baseChar.Body.HeightInches = (5 * 12) + 10; // 5' 10"
            baseChar.Body.BreastSize = BreastSize.None;
            baseChar.Body.ButtSize = ButtSize.Male;
            baseChar.Crotch = {
                BallCount: 2,
                BallDiameter: 1,
                PenisLength: 3,
                PenisErectLength: 6,
                PenisType: GenitalType.Human,
                PenisColor: Color.Tan,
                PenisWidth: 1,
                VaginaDepth: 0,
                VaginaDiameter: 0,
                VaginaColor: Color.Tan,
                VaginaType: GenitalType.Human,
            };
        }
        else {
            // New Female Character
            baseChar.Head.FaceShape = FaceShape.Round;
            baseChar.Head.FaceType = FaceType.Feminine;
            baseChar.Head.HairColor = Color.Brown;
            baseChar.Head.HairLength = 9;
            baseChar.Body.BodyTypeIndex = 0.5;
            baseChar.Body.HeightInches = (5 * 12) + 5; // 5' 5"
            baseChar.Body.BreastSize = BreastSize.B;
            baseChar.Body.ButtSize = ButtSize.Average;
            baseChar.Crotch = {
                BallCount: 0,
                BallDiameter: 1,
                PenisLength: 0,
                PenisErectLength: 0,
                PenisType: GenitalType.Human,
                PenisColor: Color.Tan,
                PenisWidth: 0,
                VaginaDepth: 6,
                VaginaDiameter: 1,
                VaginaColor: Color.Tan,
                VaginaType: GenitalType.Human,
            };
        }
        return baseChar;
    };
    return CharacterMakerService;
}());
CharacterMakerService.$i = [CharacterMakerService];
xrpg.service('CharacterMakerService', CharacterMakerService.$i);
var CharacterVocabularyService = (function () {
    function CharacterVocabularyService() {
        this.Character = null;
    }
    CharacterVocabularyService.prototype.GetCharacterVocab = function (char) {
        this.Character = char;
        return {
            ShortGenderMessage: this.GetShortGenderMessage(),
            HairColor: this.EnumName(Color, this.Character.Head.HairColor).toLowerCase(),
            HairLength: this.GetHairLength(),
            EyeColor: this.EnumName(Color, this.Character.Head.EyeColor).toLowerCase(),
            EarType: this.GetEarLength(),
            FaceType: this.GetFaceType(),
            TongueLength: this.GetTongueLength(),
            BodyType: this.GetBodyType(),
            Breasts: this.GetBreasts(),
            ButtSize: this.GetButtType(),
            Height: this.GetHeight(),
            NumArms: this.GetArms(),
            SkinColor: "Your skin color is " + this.EnumName(Color, this.Character.Body.SkinColor).toLowerCase() + ".",
            Tail: this.Character.Body.Tail === TailType.None ? '' : "It's " + this.EnumName(TailType, this.Character.Body.Tail).toLowerCase() + ' tail.',
            BallCountMessage: this.GetBallCount(),
            Penis: this.GetPenis(),
            Vagina: this.GetVagina()
        };
    };
    /**
     * Gets a short gender message for the character, like "You are a girl.".
     */
    CharacterVocabularyService.prototype.GetShortGenderMessage = function () {
        if (this.Character.Crotch.PenisLength && this.Character.Crotch.VaginaDepth && this.Character.Crotch.BallCount) {
            return "You are a hermaphrodite, you have both sets of genitals, and " + this.GetBallCount() + ", too.";
        }
        if (this.Character.Crotch.PenisLength && this.Character.Crotch.VaginaDepth) {
            return 'You are a hermaphrodite, you have both sets of genitals.';
        }
        if (this.Character.Crotch.VaginaDepth && this.Character.Crotch.BallCount) {
            return "You are a girl, but you also have " + this.GetBallCount() + ", too.";
        }
        if (this.Character.Crotch.VaginaDepth) {
            return "You are a girl.";
        }
        if (this.Character.Crotch.PenisLength && this.Character.Crotch.BallCount) {
            return "You are a boy, with " + this.GetBallCount(true) + ".";
        }
        if (this.Character.Crotch.PenisLength) {
            return "You are a boy, but you don't have any balls.";
        }
        return 'You have nothing between your legs. You are androgynous.';
    };
    /**
     * Gets the number of balls for the character, e.g. "1 ball" or "3 balls".
     * @param addNormal Whether or not to include the word "normal". Be sure they're a boy! :)
     */
    CharacterVocabularyService.prototype.GetBallCount = function (addNormal) {
        if (addNormal === void 0) { addNormal = false; }
        return addNormal && this.Character.Crotch.BallCount === 2
            ? '2 normal balls'
            : plural(this.Character.Crotch.BallCount, 'ball', 'balls');
    };
    /**
     * Gets the hair length. Dependent upon character height.
     * TODO: Make this dependent on character height. :)
     */
    CharacterVocabularyService.prototype.GetHairLength = function () {
        var len = this.Character.Head.HairLength;
        switch (true) {
            case len <= 0.2: return "You're bald - there's no hair up there!";
            case len <= 2: return "You have a buzz cut.";
            case len <= 4: return "You have short, boyish hair.";
            case len <= 7: return "You have a pixie cut, your hair just covers your ears.";
            case len <= 9: return "You have a short feminine cut, your hair doesn't quite reach your shoulders.";
            case len <= 12: return "You have shoulder-length hair.";
            case len <= 16: return "Your long hair runs down your back to your shoulderblades.";
            case len <= 26: return "Your long hair extends to the middle of your back.";
            case len <= 40: return "Your long hair extends all the way down to your butt.";
            case len <= 50: return "Your extremely long hair reaches all the way down to your knees.";
            case len <= 60: return "Your hair goes all the way down to the floor. Don't trip!";
        }
    };
    CharacterVocabularyService.prototype.GetEarLength = function () {
        switch (this.Character.Head.EarType) {
            case EarType.None: return "You have no ears, just holes in the side of your head.";
            case EarType.Human: return "You have normal, human ears.";
            case EarType.Cat: return "You have furry, pointed cat ears on top of your head. You can also hear *really* well.";
            case EarType.Dog: return "You have floppy fuzzy dog ears that dangle off the top of your head.";
            case EarType.SlightlyPointed: return "You have slightly pointed ears... sort of like a Vulcan.";
            case EarType.Pointed: return "You have pointed ears.";
            case EarType.LongPointed: return "You have long, pointed ears.";
            case EarType.VeryLongPointed: return "You have *very* long, pointed ears, like an Elf.";
        }
    };
    CharacterVocabularyService.prototype.GetFaceType = function () {
        var shape = this.Character.Head.FaceShape;
        switch (this.Character.Head.FaceType) {
            case FaceType.VeryFeminine: return "You have a " + this.EnumName(FaceShape, shape).toLowerCase() + ", very feminine face.";
            case FaceType.Feminine: return "You have a " + this.EnumName(FaceShape, shape).toLowerCase() + ", slightly feminine face.";
            case FaceType.Neutral: return "You have a " + this.EnumName(FaceShape, shape).toLowerCase() + ", neutral face. You could pass for either sex.";
            case FaceType.Masculine: return "You have a " + this.EnumName(FaceShape, shape).toLowerCase() + ", slightly masculine face.";
            case FaceType.VeryMasculine: return "You have a " + this.EnumName(FaceShape, shape).toLowerCase() + ", very masculine face.";
        }
    };
    CharacterVocabularyService.prototype.GetTongueLength = function () {
        var len = this.Character.Head.TongueLength;
        switch (true) {
            case len < 0.1: return "You don't have a tongue!";
            case len < 3: return "You have a smaller than average tongue. Probably not good for pleasuring anything.";
            case len < 5: return "You have an average tongue.";
            case len < 7: return "You have a slightly larger than average tongue. It works to your advantage when *licking things.*";
            default: return "You have a ridiculously large tongue (" + len + " in)! You must be *really good* at oral.";
        }
    };
    CharacterVocabularyService.prototype.GetHeight = function () {
        var feet = Math.floor(this.Character.Body.HeightInches / 12);
        var inches = this.Character.Body.HeightInches % 12;
        if (inches > 0) {
            return feet + "ft " + inches + "in";
        }
        return feet + "ft";
    };
    CharacterVocabularyService.prototype.GetBodyType = function () {
        var t = this.Character.Body.BodyTypeIndex;
        switch (true) {
            case t < -1.0: return "Your body is extremely manly. Your muscles are toned and well-defined, you have large, square shoulders, a six-pack, and lots of body hair.";
            case t < -0.8: return "Your body is very manly. You have toned muscles and your stomach is flat. You have a decent amount of body hair.";
            case t < -0.6: return "Your body is definitely male. You have muscles and noticeable body hair.";
            case t < -0.4: return "Your body is male. You have noticeable muscles and body hair, and tall, defined shoulders.";
            case t < -0.2: return "Your body is slightly male. You have some muscle tone, and someone looking closely would notice your body hair.";
            case t < 0.0: return "Your body is ever so slightly male. Your muscle tone is very faint, and you have a very small amount of body hair.";
            case t == 0.0: return "Your body type is androgynous. You have no defining male or female characteristics one way or the other.";
            case t < 0.2: return "Your body is slightly feminine. Your body hair is thin and light, but noticeable, and your hips curve ever so slightly.";
            case t < 0.4: return "Your body is somewhat feminine. Your body hair is unnoticeable from afar, and your hips have a bit of a curve to them.";
            case t < 0.6: return "Your body is female. You have body hair that could be described as 'peach fuzz', and your hips and waist form a slight but pleasing hourglass shape.";
            case t < 0.8: return "Your body is definitely female. You have almost no body hair to speak of, your stomach is flat, your waist is small, and your hips form a definite hourglass shape.";
            case t <= 1.0: return "Your body is very feminine. You have no body hair whatsoever, your stomach is flat and toned, your waist is tiny, and your hourglass figure puts models to shame.";
            case t > 1.0: return "Your body is extremely feminine. You are completely hairless (except maybe your head), your waist is very tiny, your hips are enormous, and your hourglass figure will no doubt gather lots of attention.";
            default: "Your body type is unknown at this time. Maybe try finding a mirror or something...?";
        }
    };
    CharacterVocabularyService.prototype.GetButtType = function () {
        switch (this.Character.Body.ButtSize) {
            case ButtSize.Male: return "Your butt is flat, toned, and manly.";
            case ButtSize.Flat: return "Your butt is flat.";
            case ButtSize.Small: return "Your butt is very small, it's almost flat.";
            case ButtSize.Perky: return "Your butt is small and perky.";
            case ButtSize.Average: return "Your butt is normal, it's got just the right padding to it.";
            case ButtSize.Large: return "Your butt is pretty large, it's got a good amount of plump to it.";
            case ButtSize.Huge: return "Your butt is huge, it's got a lot of padding to it.";
            case ButtSize.Massive: return "Your butt is massive, it's plump and round. You have trouble fitting it into some clothes.";
            case ButtSize.Enormous: return "Your butt is absolutely enormous. When you sit, it feels like you're always sitting on a pillow. Most form-fitting clothes don't fit over your massive ass.";
        }
    };
    CharacterVocabularyService.prototype.GetBreasts = function () {
        var s = this.Character.Body.BreastCount;
        var cup = this.EnumName(BreastSize, this.Character.Body.BreastSize);
        switch (true) {
            case s <= 0: return "You don't have any breasts.";
            case s == 1: return "You have a single " + cup + " cup breast centered on your chest.";
            case s == 2: return "You have a pair of " + cup + " cup breasts on your chest.";
            case s == 3: return "You have three " + cup + " cup breasts, all in a row on your chest.";
            case s == 4: return "You have two pairs of " + cup + " cup breasts, the second set right underneath the first.";
            case s % 2 == 0: return "You have " + s / 2 + " pairs of " + cup + " cup breasts running down your chest.";
            case s % 2 == 1: return "You have " + (s - 1) / 2 + " pairs of " + cup + " cup breasts running down your chest, with an extra one centered at the bottom.";
            default: "You have " + s + " " + cup + " cup breasts.";
        }
    };
    CharacterVocabularyService.prototype.GetArms = function () {
        var a = this.Character.Body.NumArms;
        switch (true) {
            case a == 0: return "You don't have any arms. Somehow, you manage to use stuff with your feet.";
            case a == 1: return ""; // Standard number of arms? Don't say anything. That's kinda weird.
            case a == 2: return "You have two sets of arms. Surprisingly, your brain doesn't have any problem controlling them.";
            case a == 3: return "You have three sets of arms. You have trouble fitting into most tops since there are only two arm holes.";
            default: return "You have " + a + " sets of arms. That's a lot of arms! You probably won't fit into any tops with all those arms.";
        }
    };
    CharacterVocabularyService.prototype.GetPenis = function () {
        if (this.Character.Crotch.PenisLength == 0)
            return '';
        var length = this.Character.Crotch.PenisLength;
        var eLength = this.Character.Crotch.PenisErectLength;
        var width = this.Character.Crotch.PenisWidth;
        var lengthMsg = 'You have a penis. ';
        switch (true) {
            case length < 2:
                lengthMsg += "It's very small (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 4:
                lengthMsg += "It's relatively small (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 5:
                lengthMsg += "It's slightly smaller than average (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 7:
                lengthMsg += "It'sn average sized (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 9:
                lengthMsg += "It's slightly larger than average (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 11:
                lengthMsg += "It's rather large (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 14:
                lengthMsg += "It's very large (" + length + "in, " + eLength + "in erect).";
                break;
            case length < 17:
                lengthMsg += "It's huge (" + length + "in, " + eLength + "in erect)!";
                break;
            default:
                lengthMsg += "It's *massive* (" + length + "in, " + eLength + "in erect)!";
                break;
        }
        var widthMsg = '';
        switch (true) {
            case width < 0.2:
                widthMsg = "It's very narrow - only " + width + "in in diameter.";
                break;
            case width < 0.4:
                widthMsg = "It's somewhat narrow, around " + width + "in in diameter.";
                break;
            case width < 0.7:
                widthMsg = "It's slightly thinner than normal, about " + width + "in in diameter.";
                break;
            case width < 1.2:
                widthMsg = "It's got a pretty normal girth, " + width + "in in diameter or so.";
                break;
            case width < 1.5:
                widthMsg = "It's a little on the thick side, " + width + "in in diameter.";
                break;
            case width < 2.5:
                widthMsg = "It's really thick, " + width + "in in diameter.";
                break;
            case width < 4:
                widthMsg = "It's ridiculously wide - " + width + "in in diameter.";
                break;
        }
        var materialMsg = this.Character.Crotch.PenisType == GenitalType.Human ? ''
            : "It appears to be a " + this.EnumName(GenitalType, this.Character.Crotch.PenisType).toLowerCase() + " penis.";
        var colorMsg = this.Character.Crotch.PenisColor == Color.Tan ? ''
            : "Your penis is " + this.EnumName(Color, this.Character.Crotch.PenisColor).toLowerCase() + ".";
        return lengthMsg + " " + widthMsg + " " + materialMsg + " " + colorMsg;
    };
    CharacterVocabularyService.prototype.GetVagina = function () {
        if (this.Character.Crotch.VaginaDepth == 0)
            return '';
        var depth = this.Character.Crotch.VaginaDepth;
        var width = this.Character.Crotch.VaginaDiameter;
        var depthMsg = 'You have a vagina. ';
        switch (true) {
            case depth < 2:
                depthMsg += "It's very shallow (" + depth + "in deep). Not much will fit in there.";
                break;
            case depth < 4:
                depthMsg += "It's relatively shallow  (" + depth + "in deep).";
                break;
            case depth < 5:
                depthMsg += "It's slightly more shallow than normal (" + depth + "in deep).";
                break;
            case depth < 7:
                depthMsg += "It's fairly average (" + depth + "in deep).";
                break;
            case depth < 9:
                depthMsg += "It's slightly deeper than average (" + depth + "in deep).";
                break;
            case depth < 11:
                depthMsg += "It's rather deep (" + depth + "in deep).";
                break;
            case depth < 14:
                depthMsg += "It's very deep (" + depth + "in deep).";
                break;
            case depth < 17:
                depthMsg += "It's extremely deep (" + depth + "in deep)!";
                break;
            default:
                depthMsg += "It's *massive* (" + depth + "in deep)! You can fit almost *anything* in there.";
                break;
        }
        var widthMsg = '';
        switch (true) {
            case width < 0.2:
                widthMsg = "It's very narrow - only " + width + "in in diameter.";
                break;
            case width < 0.4:
                widthMsg = "It's somewhat narrow, around " + width + "in in diameter.";
                break;
            case width < 0.7:
                widthMsg = "It's *slightly* more narrow than normal, about " + width + "in in diameter.";
                break;
            case width < 1.2:
                widthMsg = "It's got a pretty normal width, " + width + "in in diameter or so.";
                break;
            case width < 1.5:
                widthMsg = "It's a little on the wide side, " + width + "in in diameter.";
                break;
            case width < 2.5:
                widthMsg = "It's really wide, " + width + "in in diameter.";
                break;
            case width < 4:
                widthMsg = "It's ridiculously wide - " + width + "in in diameter.";
                break;
        }
        var materialMsg = this.Character.Crotch.VaginaType == GenitalType.Human ? ''
            : "It appears to be a " + this.EnumName(GenitalType, this.Character.Crotch.VaginaType).toLowerCase() + " vagina.";
        var colorMsg = this.Character.Crotch.VaginaColor == Color.Tan ? ''
            : "Your vagina is " + this.EnumName(Color, this.Character.Crotch.VaginaColor).toLowerCase() + ".";
        return depthMsg + " " + widthMsg + " " + materialMsg + " " + colorMsg;
    };
    /**
     * Gets an enum's name by its value.
     * @param enumeration The enum to use as a lookup.
     * @param value The value to look up in the enum.
     */
    CharacterVocabularyService.prototype.EnumName = function (enumeration, value) {
        return enumeration[value];
    };
    return CharacterVocabularyService;
}());
xrpg.service('CharacterVocabularyService', CharacterVocabularyService);
var ItemRepository = (function () {
    function ItemRepository() {
        this.Items = [
            {
                Name: "Pink Stuff",
                Description: "It's a bottle of... pink stuff. You should probably only drink this if you *really* like pink.",
                Type: ItemType.Potion,
                Apply: function (c) {
                    c.Body.SkinColor = Color.HotPink;
                    c.Crotch.VaginaColor = Color.HotPink;
                    c.Crotch.PenisColor = Color.HotPink;
                    c.Head.EyeColor = Color.HotPink;
                    c.Head.HairColor = Color.HotPink;
                    var message = 'Your entire body, including your hair and even your eyes, have turned a bright, hot pink.';
                    switch (CharacterHelper.GetSexType(c)) {
                        case SexType.Male:
                            message += " Your penis has also turned hot pink. You're not quite sure how to feel about that.";
                            break;
                        case SexType.Female:
                            message += " Your vagina has also turned hot pink.";
                            break;
                        case SexType.Both:
                            message += " Both your penis and vagina have also turned hot pink.";
                            break;
                    }
                    return message;
                }
            },
            {
                Name: 'Prowler',
                Description: "A small black bottle with two eyes on the front.",
                Type: ItemType.Potion,
                Apply: function (c) {
                    c.Body.Tail = TailType.Cat;
                    c.Head.EarType = EarType.Cat;
                    c.Head.EyeColor = Color.Yellow;
                    c.Body.BreastCount = 12;
                    var message = "You have grown cat ears and a cat tail, and your eyes have turned bright yellow. ";
                    if (c.Body.BreastSize !== BreastSize.None) {
                        message += " You have also grown a set of 6 breasts on each side, each one slightly smaller than the pair above it.";
                    }
                    else {
                        message += " You have also grown a set of 6 nipples on each side.";
                    }
                    message += " *Meey-oww!*";
                    return message;
                }
            },
            {
                Name: 'Spotted Cookie',
                Description: "It's a round, brown cookie with horns. Surprisingly fresh. Smells pretty good.",
                Type: ItemType.Food,
                Apply: function (c) {
                    var message = '';
                    if (c.Crotch.PenisLength) {
                        message += "Your cock magically grows into an enormous brown horse dick.\n                                It's 9 inches (16 inches when you're hard). You grab it with your\n                                hand... you can barely grasp it. It must be 3 inches in diameter.";
                    }
                    else {
                        message += "You feel a sensation between your legs, right where your pubic bone is.\n                                You look down as the pressure builds, just as an enormous brown horse cock\n                                shoots out from your crotch. It grows to a massive 9 inches. The sight\n                                of it and the feeling of it growing arouses you, and your new cock becomes hard,\n                                growing to a massive 16 inches. You grasp it firmly... it must be a good 3 inches\n                                in diameter because it barely fits in your hand.";
                    }
                    message += "\r\n";
                    message += sizer(c.Crotch.BallCount, 2, "You feel a shifting below your cock... You reach down there and realize that you now have 2 balls.", "Your balls start tingling... you reach down to touch them.");
                    message += sizer(c.Crotch.BallDiameter, 4, "You suddenly feel them shrink to the size of baseballs. Not as big as they were, but still big enough to be annoying.", "Your balls are already about the size of a bull's, so they stay the same size.", "You feel them start to swell and grow... they expand to the size of baseballs, swinging freely between your legs.");
                    c.Crotch.PenisLength = 9;
                    c.Crotch.PenisErectLength = 16;
                    c.Crotch.PenisWidth = 3;
                    c.Crotch.PenisType = GenitalType.Bovine;
                    c.Crotch.PenisColor = Color.Brown;
                    c.Crotch.BallCount = 2;
                    c.Crotch.BallDiameter = 4;
                    return message;
                }
            },
            {
                Name: 'Tower Soda',
                Description: 'A bubbly green potion that simply reads "Tower Soda". You wonder what it tastes like.',
                Type: ItemType.Potion,
                Apply: function (c) {
                    c.Body.HeightInches += 12;
                    return "You feel a tingling, stretching motion as your body grows taller. You now stand " + c.Body.HeightInches + " inches tall.";
                }
            },
            {
                Name: 'The X',
                Description: "It's a nondescrpit clear vial with a black 'X' on it.",
                Type: ItemType.Potion,
                Apply: function (c) {
                    var st = CharacterHelper.GetSexType(c);
                    switch (st) {
                        case SexType.Male:
                            c.Crotch.VaginaDepth = c.Crotch.PenisErectLength;
                            c.Crotch.VaginaDiameter = c.Crotch.PenisWidth;
                            c.Crotch.VaginaColor = c.Crotch.PenisColor;
                            c.Crotch.VaginaType = c.Crotch.PenisType;
                            c.Crotch.PenisLength = 0;
                            c.Crotch.PenisWidth = 0;
                            c.Crotch.BallCount = 0;
                            return "You feel a strong pulling in your crotch, and suddenly feel your " + c.Crotch.VaginaDepth + "in penis magically invert, creating a " + c.Crotch.VaginaDepth + "in deep vagina in its place. If you had any balls before, those are gone, too.";
                        case SexType.Female:
                            c.Crotch.PenisErectLength = c.Crotch.VaginaDepth;
                            c.Crotch.PenisLength = Math.round(c.Crotch.VaginaDepth / 2);
                            c.Crotch.PenisWidth = c.Crotch.VaginaDepth;
                            c.Crotch.PenisColor = c.Crotch.VaginaColor;
                            c.Crotch.PenisType = c.Crotch.VaginaType;
                            c.Crotch.BallCount = 2;
                            c.Crotch.BallDiameter = 1;
                            c.Crotch.VaginaDepth = 0;
                            c.Crotch.VaginaDiameter = 0;
                            return "You feel a pressure building in the slit between your legs. Suddenly, you feel something pushing out of it. Looking down, you realize that your " + c.Crotch.PenisErectLength + "in deep vagina has magically grown outwards into a " + c.Crotch.PenisErectLength + "in erect cock in its place. Reaching below it with your hand, you realize you have also grown two regularly sized balls.";
                        case SexType.Both:
                            c.Crotch.PenisLength = 0;
                            c.Crotch.PenisErectLength = 0;
                            c.Crotch.PenisWidth = 0;
                            c.Crotch.BallCount = 0;
                            c.Crotch.BallDiameter = 0;
                            c.Crotch.VaginaDepth = 0;
                            c.Crotch.VaginaDiameter = 0;
                            return "You feel both of your sex organs tingle. Suddenly, you feel your vagina pressing outwards, just as your cock shrinks and sucks into your pelvis. You are now sexless.";
                        case SexType.None:
                            c.Crotch.PenisLength = 3;
                            c.Crotch.PenisErectLength = 6;
                            c.Crotch.PenisWidth = 1;
                            c.Crotch.BallCount = 2;
                            c.Crotch.BallDiameter = 1;
                            c.Crotch.VaginaDepth = 6;
                            c.Crotch.VaginaDiameter = 1;
                            return "You feel your sexless mound start to tingle. A small slit forms between your legs and you feel something pressing up inside of you. Simultaneously, you feel your pelvic bone tingle and expand, as you grow a penis and balls above your new slit. You now have both sets of sex organs.";
                    }
                    return "Strangely enough, nothing happened. You're not sure why.";
                }
            },
        ];
    }
    return ItemRepository;
}());
xrpg.service('ItemRepository', ItemRepository);
var MapService = (function () {
    function MapService($rootScope, biomeRepository) {
        this.$rootScope = $rootScope;
        this.biomeRepository = biomeRepository;
        this.Position = {
            x: -1,
            y: -1
        };
        this.LoadMap();
        if (!this.Map) {
            this.GenerateMap();
        }
    }
    MapService.prototype.OnMapChanged = function () {
        this.$rootScope.$broadcast(GameEvents.Map.Changed, {
            Map: this.Map,
            Position: this.Position
        });
    };
    MapService.prototype.GenerateMap = function (w, h) {
        if (w === void 0) { w = 16; }
        if (h === void 0) { h = 16; }
        this.Map = this.NewMap(w, h);
        this.SetPos(0, 0);
        this.SaveMap();
        this.OnMapChanged();
    };
    MapService.prototype.CanMoveUp = function () {
        return this.Position.x > 0;
    };
    MapService.prototype.CanMoveDown = function () {
        return this.Position.x < this.Map.Size.x - 1;
    };
    MapService.prototype.CanMoveLeft = function () {
        return this.Position.y > 0;
    };
    MapService.prototype.CanMoveRight = function () {
        return this.Position.y < this.Map.Size.y - 1;
    };
    MapService.prototype.Move = function (direction) {
        var moved = false;
        switch (direction) {
            case Direction.Up:
                if (this.Position.x > 0) {
                    this.Position.x--;
                    moved = true;
                }
                break;
            case Direction.Down:
                if (this.Position.x < this.Map.Size.x - 1) {
                    this.Position.x++;
                    moved = true;
                }
                break;
            case Direction.Left:
                if (this.Position.y > 0) {
                    this.Position.y--;
                    moved = true;
                }
                break;
            case Direction.Right:
                if (this.Position.y < this.Map.Size.y - 1) {
                    this.Position.y++;
                    moved = true;
                }
                break;
        }
        if (moved) {
            this.Map.Map[this.Position.x][this.Position.y].HasVisited = true;
        }
        return moved;
    };
    // #Admin
    MapService.prototype.RevealMap = function () {
        for (var i = 0; i < this.Map.Size.x; i++) {
            for (var j = 0; j < this.Map.Size.y; j++) {
                this.Map.Map[i][j].HasVisited = true;
            }
        }
    };
    MapService.prototype.SetPos = function (x, y) {
        this.Position.x = x;
        this.Position.y = y;
        this.Map.Map[x][y].HasVisited = true;
        this.OnMapChanged();
    };
    MapService.prototype.NewMap = function (x, y) {
        var map = [];
        for (var i = 0; i < x; i++) {
            map[i] = [];
            for (var j = 0; j < y; j++) {
                map[i][j] = {
                    Biome: this.biomeRepository.GetBiomeByCoordinates(i / x, j / y),
                    HasVisited: false,
                    Encounter: { Name: "An Encounter" },
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
    };
    MapService.prototype.SaveMap = function () {
        localStorage.setItem(StorageKeys.Map, JSON.stringify(this.Map));
    };
    MapService.prototype.LoadMap = function () {
        try {
            var data = localStorage.getItem(StorageKeys.Map);
            if (data && data.length && data.trim()[0] === '{') {
                this.Map = JSON.parse(data);
            }
        }
        catch (e) {
            console.error('XRPG: Unable to load map from local storage. Data is missing or does not appear to be JSON.', e);
        }
    };
    return MapService;
}());
MapService.$inject = [
    '$rootScope',
    'BiomeRepository'
];
xrpg.service('MapService', MapService);
