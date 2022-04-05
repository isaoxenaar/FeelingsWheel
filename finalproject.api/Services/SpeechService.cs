using Microsoft.CognitiveServices.Speech;
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
}