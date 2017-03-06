/* Interfaces for Attributes */

/**
 * Overall character attribute object. Contains numerous sub-objects.
 */
interface ICharacter
{
    Name : string
    Head : ICharacterHead
    Body : ICharacterBody
    Crotch : ICharacterCrotch
}

/**
 * Attributes related to the head and face, specifically.
 */
interface ICharacterHead
{
    /**
     * The hair color. May not be relevant if hair length is 0.
     */
    HairColor : Color
    /**
     * The hair length, in inches.
     */
    HairLength : number
    /**
     * The eye color.
     */
    EyeColor : Color
    /**
     * The type of the face.
     */
    FaceType : FaceType
    /**
     * The shape of the face.
     */
    FaceShape : FaceShape
    /**
     * The shape of the ear.
     */
    EarType : EarType
    /**
     * The length of the tongue, in inches.
     */
    TongueLength : number
}

/**
 * Attributes related to the body and overall torso.
 */
interface ICharacterBody
{
    /**
     * Body type index. Feminine is 1, masculine is -1, and 0 is neutral.
     */
    BodyTypeIndex : number
    /**
     * The body height, in inches.
     */
    HeightInches : number
    /**
     * The skin color.
     */
    SkinColor : Color
    /**
     * The number of arms on each side.
     */
    NumArms : number
    /**
     * The size of the breasts.
     */
    BreastSize : BreastSize
    /**
     * The number of breasts.
     */
    BreastCount : number,
    /**
     * The size of the butt.
     */
    ButtSize : ButtSize
}

/**
 * Attributes related to the crotch region.
 */
interface ICharacterCrotch
{
    /**
     * The penis length, in inches. A value of 0 indicates no penis.
     */
    PenisLength : number
    /**
     * The penis length, in inches, when erect. A value of 0 indicates no penis.
     */
    PenisErectLength : number
    /**
     * The penis width / girth, in inches. A value of 0 idicates no penis.
     */
    PenisWidth : number
    /**
     * The material the penis is made out of.
     */
    PenisMaterial : Material,
    /**
     * The color of the penis.
     */
    PenisColor : Color,
    /**
     * The size/diameter of the balls, in inches.
     */
    BallDiameter : number
    /**
     * The number of balls. A value of 0 indicates no balls.
     */
    BallCount : number
    /**
     * The diameter of the vagina opening. A value of 0 indicates no vagina.
     */
    VaginaDiameter : number
    /**
     * The depth of the vagina, in inches. A value of 0 indicates no vagina.
     */
    VaginaDepth : number,
    /**
     * The material the vagina is made out of.
     */
    VaginaMaterial : Material,
    /**
     * The color of the vagina.
     */
    VaginaColor : Color
}

/* Enums */

/**
 * Specifies the color of anything (hair, eyes, etc).
 */
enum Color
{
    Red, DarkRed,
    Orange, LightOrange,
    Yellow, LightYellow,
    Green, LightGreen, DarkGreen,
    Blue, LightBlue, DarkBlue,
    Purple, LightPurple, DarkPurple,
    Pink, LightPink, HotPink, DarkPink,
    Hazel,
    Brown, LightBrown, DarkBrown,
    Black,
    Teal, LightTeal, DarkTeal,
    Tan, DarkTan,
    White, PaleWhite,
    Gray, DarkGray, LightGray,
    Silver, DarkSilver,
    Gold, DarkGold, LightGold
}

/**
 * Specifies the face type / shape.
 */
enum FaceType
{
    VeryMasculine,
    Masculine,
    Neutral,
    Feminine,
    VeryFeminine
}

/**
 * Specifies the overall shape of the face.
 */
enum FaceShape
{
    Round,
    Square,
    Long,
    'Heart-Shaped'
}

/**
 * Specifies the ear type. 
 */
enum EarType
{
    None,
    Human,
    SlightlyPointed,
    Pointed,
    LongPointed,
    VeryLongPointed,
    Dog,
    Cat
}

/**
 * Specifies any type of material for a part of the body.
 */
enum Material
{
    Skin,
    Scales,
    Plastic
}

/**
 * Specifies an extremity type (hand/foot).
 */
enum ExtremityType
{
    Human,
    Paw,
    Claw
}

enum BreastSize
{
    None,
    A,
    B,
    C,
    D,
    DD,
    E,
    EE,
    F,
    FF,
    G,
    H,
    I,
    J
}

enum ButtSize
{
    Male,
    Flat,
    Small,
    Perky,
    Average,
    Large,
    Huge,
    Massive,
    Enormous
}