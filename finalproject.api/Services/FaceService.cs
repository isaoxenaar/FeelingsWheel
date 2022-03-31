using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using System.Text.RegularExpressions;
using System.Drawing;

namespace finalproject.api.Services;

public class FaceService
{
    private const string RECOGNITION_MODEL4 = RecognitionModel.Recognition04;
    public static IFaceClient Authenticate(string endpoint, string key)
    {
        return new FaceClient(new ApiKeyServiceClientCredentials(key)) { Endpoint = endpoint };
    }
    public static async Task<Emotion> DetectFaceExtract(Stream stream)
    {
        var client = Authenticate("https://faceapiforfinalproject.cognitiveservices.azure.com/", "9987cfbb45954a61887504b7248773d2");

        var detectedFace = await client.Face.DetectWithStreamAsync(stream,
                returnFaceAttributes: new List<FaceAttributeType> { FaceAttributeType.Emotion },
                detectionModel: DetectionModel.Detection01,
                recognitionModel: RECOGNITION_MODEL4);

        var face = detectedFace.FirstOrDefault();

        var emotion = new Emotion
        {
            Anger = face.FaceAttributes.Emotion.Anger,
            Contempt = face.FaceAttributes.Emotion.Contempt,
            Disgust = face.FaceAttributes.Emotion.Disgust,
            Fear = face.FaceAttributes.Emotion.Fear,
            Happiness = face.FaceAttributes.Emotion.Happiness,
            Neutral = face.FaceAttributes.Emotion.Neutral,
            Sadness = face.FaceAttributes.Emotion.Sadness,
            Surprise = face.FaceAttributes.Emotion.Surprise,
        };
        return emotion;
    }
}