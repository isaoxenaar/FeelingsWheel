using Microsoft.CognitiveServices.Speech;
using System.Web;
public class SpeechService
{

    public void OutputSpeechRecognitionResult(SpeechRecognitionResult speechRecognitionResult)
    {
        switch (speechRecognitionResult.Reason)
        {
            case ResultReason.RecognizedSpeech:
                Console.WriteLine($"RECOGNIZED: Text={speechRecognitionResult.Text}");
                break;
            case ResultReason.NoMatch:
                Console.WriteLine($"NOMATCH: Speech could not be recognized.");
                break;
            case ResultReason.Canceled:
                var cancellation = CancellationDetails.FromResult(speechRecognitionResult);
                Console.WriteLine($"CANCELED: Reason={cancellation.Reason}");

                if (cancellation.Reason == CancellationReason.Error)
                {
                    Console.WriteLine($"CANCELED: ErrorCode={cancellation.ErrorCode}");
                    Console.WriteLine($"CANCELED: ErrorDetails={cancellation.ErrorDetails}");
                    Console.WriteLine($"CANCELED: Double check the speech resource key and region.");
                }
                break;
        }
    }
    // public static string OutputSpeechRecognitionResult(SpeechRecognitionResult speechRecognitionResult)
    // {
    //     switch (speechRecognitionResult.Reason)
    //     {
    //         case ResultReason.RecognizedSpeech:
    //             return speechRecognitionResult.Text;
    //         case ResultReason.NoMatch:
    //             return "NOMATCH: Speech could not be recognized.";
    //         case ResultReason.Canceled:
    //             var cancellation = CancellationDetails.FromResult(speechRecognitionResult);
    //             return cancellation.Reason.ToString();
    //     }
    //     return "";
    // }
    public async Task<string> GetTextSentiment(string inputText)
    {
        var text = HttpUtility.UrlEncode(inputText);
        var key = "d26601afef30b515273b6690228be191b3d1dd43";
        var url = $"https://api.kenzyai.com/?key={key}&text={text}";
        var apiResponse = "";
        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync(url))
            {
                apiResponse = await response.Content.ReadAsStringAsync();
            }
        }
        return apiResponse;
    }
}