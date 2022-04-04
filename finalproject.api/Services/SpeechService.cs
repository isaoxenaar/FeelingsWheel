using Microsoft.CognitiveServices.Speech;
public class SpeechService
{
    public static string OutputSpeechRecognitionResult(SpeechRecognitionResult speechRecognitionResult)
    {
        switch (speechRecognitionResult.Reason)
        {
            case ResultReason.RecognizedSpeech:
                return speechRecognitionResult.Text;
            case ResultReason.NoMatch:
                return "NOMATCH: Speech could not be recognized.";
            case ResultReason.Canceled:
                var cancellation = CancellationDetails.FromResult(speechRecognitionResult);
                return cancellation.Reason.ToString();
        }
        return "";
    }
}