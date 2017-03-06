var xrpg = angular.module('xrpg', ['ngRoute']);
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
var GameController = (function () {
    function GameController(charService, charVocab, $rootScope) {
        var _this = this;
        this.charService = charService;
        this.charVocab = charVocab;
        this.$rootScope = $rootScope;
        this.Character = null;
        this.GenderMessage = function () { return _this.charVocab.GetShortGenderMessage(); };
        $rootScope.$on(GameEvents.Character.Changed, function (e, char) {
            _this.Character = char;
        });
    }
    GameController.prototype.init = function () {
        this.charService.OnCharacterChanged();
    };
    return GameController;
}());
GameController.$inject = [
    'CharacterService',
    'CharacterVocabularyService',
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
var NewCharacterController = (function () {
    function NewCharacterController(characterService, $location) {
        this.characterService = characterService;
        this.$location = $location;
        this.newName = '';
    }
    NewCharacterController.prototype.boy = function () {
        this.characterService.NewCharacter(this.newName, true);
        this.$location.url('/game');
    };
    NewCharacterController.prototype.girl = function () {
        this.characterService.NewCharacter(this.newName, false);
        this.$location.url('/game');
    };
    return NewCharacterController;
}());
NewCharacterController.$inject = [
    'CharacterService',
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
var CharacterService = (function () {
    function CharacterService(characterMaker, $rootScope) {
        this.characterMaker = characterMaker;
        this.$rootScope = $rootScope;
        this.Character = {
            Name: null,
            Head: {},
            Body: {},
            Crotch: {}
        };
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
        this.$rootScope.$broadcast(GameEvents.Character.Changed, this.Character);
    };
    return CharacterService;
}());
CharacterService.$inject = [
    'CharacterMakerService',
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
    function CharacterVocabularyService(charService, $rootScope) {
        var _this = this;
        this.charService = charService;
        this.$rootScope = $rootScope;
        this.Character = null;
        $rootScope.$on(GameEvents.Character.Changed, function (e, char) {
            _this.Character = char;
        });
    }
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
    return CharacterVocabularyService;
}());
CharacterVocabularyService.$inject = [
    'CharacterService',
    '$rootScope'
];
xrpg.service('CharacterVocabularyService', CharacterVocabularyService);
