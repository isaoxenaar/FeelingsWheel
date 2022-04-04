using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

[ApiController]
[Route("api/[controller]")]
public class SpeechController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<string>> postAudio(string audio)
    {
        var speechConfig = SpeechConfig.FromSubscription("9d33b42d39714ae7af0764e1767e8bec", "westeurope");
        speechConfig.SpeechRecognitionLanguage = "en-US";
        using var audioConfig = AudioConfig.FromWavFileInput(audio);
        using var speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
        var speechResult = await speechRecognizer.RecognizeOnceAsync();
        return SpeechService.OutputSpeechRecognitionResult(speechResult);

    }
}