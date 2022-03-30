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
    public static async Task<Emotion> DetectFaceExtract(IFaceClient client, string url, string recognitionModel)
    {
        var detectedFace = await client.Face.DetectWithUrlAsync($"{url}",
                returnFaceAttributes: new List<FaceAttributeType> { FaceAttributeType.Emotion },
                detectionModel: DetectionModel.Detection01,
                recognitionModel: recognitionModel);

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

    public static Image getImage(string base64)
    {

        byte[] bytes = Convert.FromBase64String(base64);

        Image image;
        using (MemoryStream ms = new MemoryStream(bytes))
        {
            image = Image.FromStream(ms);
        }

        return image;
    }
}