using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;


namespace finalproject.api.Services;

public class FaceService
{

    private const string RECOGNITION_MODEL4 = RecognitionModel.Recognition04;
    private const string IMAGE_BASE_URL = "https://csdx.blob.core.windows.net/resources/Face/Images/";
    private const string API_URL = "https://faceapiforfinalproject.cognitiveservices.azure.com/";
    private const string API_KEY = "501fd120b8b34c588c4273551b0d2179";
    public static IFaceClient Authenticate(string endpoint, string key)
    {
        return new FaceClient(new ApiKeyServiceClientCredentials(key)) { Endpoint = endpoint };
    }
    IFaceClient client = Authenticate(API_URL, API_KEY);

    public static async Task DetectFaceExtract(IFaceClient client, string url, string recognitionModel)
    {
        var imageFileNames = new List<string>()
        {
                        "detection1.jpg"                                                                               // single female with glasses
                        //"https://mymodernmet.com/wp/wp-content/uploads/2018/10/Mou-Aysha-portrait-photography-3.jpg",    // family, woman child man
                        //"https://townsquare.media/site/442/files/2022/03/attachment-smith-slaps-rock.jpg"     // chris rock at the oscar award
        };

        foreach (var imageFileName in imageFileNames)
        {
            IList<DetectedFace> detectedFaces;

            // Detect faces with all attributes from image url.
            detectedFaces = await client.Face.DetectWithUrlAsync($"{url}{imageFileName}",
                    returnFaceAttributes: new List<FaceAttributeType> { FaceAttributeType.Accessories, FaceAttributeType.Age,
                    FaceAttributeType.Blur, FaceAttributeType.Emotion, FaceAttributeType.Exposure, FaceAttributeType.FacialHair,
                    FaceAttributeType.Glasses, FaceAttributeType.Hair, FaceAttributeType.HeadPose,
                    FaceAttributeType.Makeup, FaceAttributeType.Noise, FaceAttributeType.Occlusion, FaceAttributeType.Smile,
                    FaceAttributeType.Smile, FaceAttributeType.QualityForRecognition },
                    // We specify detection model 1 because we are retrieving attributes.
                    detectionModel: DetectionModel.Detection01,
                    recognitionModel: recognitionModel);

            foreach (var face in detectedFaces)
            {
                Console.WriteLine($"{face.FaceAttributes.Age}");
            }
        }

    }
}