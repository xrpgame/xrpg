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
function plural(count, one, many, noNumber) {
    if (noNumber === void 0) { noNumber = false; }
    var ret = '';
    if (!noNumber) {
        ret += count + ' ';
    }
    return ret + (count === 1 ? one : many);
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
    function GameController(charService, mapService, $rootScope) {
        var _this = this;
        this.charService = charService;
        this.mapService = mapService;
        this.$rootScope = $rootScope;
        this.Character = null;
        this.CharacterVocab = null;
        this.Map = null;
        this.ShowCharacterSheet = false;
        this.ShowMap = false;
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
    return GameController;
}());
GameController.$inject = [
    'CharacterService',
    'MapService',
    '$rootScope'
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
var Material;
(function (Material) {
    Material[Material["Skin"] = 0] = "Skin";
    Material[Material["Scales"] = 1] = "Scales";
    Material[Material["Plastic"] = 2] = "Plastic";
})(Material || (Material = {}));
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
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
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
                TongueLength: 2,
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
                ButtSize: null //
            },
            Crotch: null
        };
        if (isMale) {
            // New Male Character
            baseChar.Head.FaceShape = FaceShape.Square;
            baseChar.Head.FaceType = FaceType.Masculine;
            baseChar.Head.HairColor = Color.Brown;
            baseChar.Head.HairLength = 1;
            baseChar.Body.BodyTypeIndex = -1;
            baseChar.Body.HeightInches = (5 * 12) + 10; // 5' 10"
            baseChar.Body.BreastSize = BreastSize.None;
            baseChar.Body.ButtSize = ButtSize.Male;
            baseChar.Crotch = {
                BallCount: 2,
                BallDiameter: 1,
                PenisLength: 3,
                PenisErectLength: 6,
                PenisMaterial: Material.Skin,
                PenisColor: Color.Tan,
                PenisWidth: 1,
                VaginaDepth: 0,
                VaginaDiameter: 0,
                VaginaColor: Color.Tan,
                VaginaMaterial: Material.Skin
            };
        }
        else {
            // New Female Character
            baseChar.Head.FaceShape = FaceShape.Round;
            baseChar.Head.FaceType = FaceType.Feminine;
            baseChar.Head.HairColor = Color.Brown;
            baseChar.Head.HairLength = 9;
            baseChar.Body.BodyTypeIndex = 1;
            baseChar.Body.HeightInches = (5 * 12) + 5; // 5' 5"
            baseChar.Body.BreastSize = BreastSize.B;
            baseChar.Body.ButtSize = ButtSize.Average;
            baseChar.Crotch = {
                BallCount: 0,
                BallDiameter: 1,
                PenisLength: 0,
                PenisErectLength: 0,
                PenisMaterial: Material.Skin,
                PenisColor: Color.Tan,
                PenisWidth: 0,
                VaginaDepth: 6,
                VaginaDiameter: 1,
                VaginaColor: Color.Tan,
                VaginaMaterial: Material.Skin
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
            BallCountMessage: this.GetBallCount(),
            HairColor: this.EnumName(Color, this.Character.Head.HairColor),
            HairLength: this.GetHairLength(),
            EyeColor: this.EnumName(Color, this.Character.Head.EyeColor)
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
var MapService = (function () {
    function MapService($rootScope) {
        this.$rootScope = $rootScope;
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
                    Biome: this.GetBiome(i, j, x, y),
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
    MapService.prototype.GetBiome = function (x, y, w, h) {
        // Q1, upper-left
        if (x < w / 2 && y < h / 2) {
            return {
                Name: 'Forest',
                Color: '#00CC11'
            };
        }
        // Q2, upper-right
        if (x <= w && y < h / 2) {
            return {
                Name: 'Desert',
                Color: '#CCCC00'
            };
        }
        // Q3, lower-left
        if (x < w / 2 && y <= h) {
            return {
                Name: 'Plains',
                Color: '#AADD00'
            };
        }
        // Q4, lower-left
        if (x <= w && y <= h) {
            return {
                Name: 'Kingdom',
                Color: '#44BBFF'
            };
        }
        return {
            Name: "Error",
            Color: '#FFCCCC'
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
    '$rootScope'
];
xrpg.service('MapService', MapService);
