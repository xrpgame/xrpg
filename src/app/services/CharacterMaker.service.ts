/**
 * Service that allows the creation of default characters.
 */
class CharacterMakerService
{
    public static $i = [CharacterMakerService];

    public MakeCharacter (isMale : boolean) : ICharacter
    {
        var baseChar : ICharacter = 
        {
            Name: null,
            Head: {
                EarType: EarType.Human,
                EyeColor: Color.Brown,
                FaceShape: null, //
                FaceType : null, //
                TongueLength: 4,
                HairColor: null, //
                HairLength: 0 //
            },
            Body: {
                BodyTypeIndex: 0, //
                HeightInches: 0, //
                NumArms: 1,
                SkinColor: Color.Tan,
                BreastCount: 2,
                BreastSize: null, //
                ButtSize: null, //
                Tail: TailType.None
            },
            Crotch: null
        }

        if (isMale)
        {
            // New Male Character

            baseChar.Head.FaceShape = FaceShape.Square;
            baseChar.Head.FaceType = FaceType.Masculine;
            baseChar.Head.HairColor = Color.Brown;
            baseChar.Head.HairLength = 1;

            baseChar.Body.BodyTypeIndex = -0.5;
            baseChar.Body.HeightInches = (5 * 12) + 10; // 5' 10"
            baseChar.Body.BreastSize = BreastSize.None;
            baseChar.Body.ButtSize = ButtSize.Male;

            baseChar.Crotch = <ICharacterCrotch> {
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
            }
        }
        else
        {
            // New Female Character

            baseChar.Head.FaceShape = FaceShape.Round;
            baseChar.Head.FaceType = FaceType.Feminine;
            baseChar.Head.HairColor = Color.Brown;
            baseChar.Head.HairLength = 9;

            baseChar.Body.BodyTypeIndex = 0.5;
            baseChar.Body.HeightInches = (5 * 12) + 5; // 5' 5"
            baseChar.Body.BreastSize = BreastSize.B;
            baseChar.Body.ButtSize = ButtSize.Average;

            baseChar.Crotch = <ICharacterCrotch> {
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
            }
        }

        return baseChar;
    }
}
xrpg.service('CharacterMakerService', CharacterMakerService.$i);