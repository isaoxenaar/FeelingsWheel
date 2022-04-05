using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

[ApiController]
[Route("api/[controller]")]
public class SpeechController : ControllerBase
{
    static string YourSubscriptionKey = "9d33b42d39714ae7af0764e1767e8bec";
    static string YourServiceRegion = "westeurope";

    private readonly SpeechService _service;
    public SpeechController(SpeechService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task postAudio()
    {
        var speechConfig = SpeechConfig.FromSubscription(YourSubscriptionKey, YourServiceRegion);
        speechConfig.SpeechRecognitionLanguage = "en-US";

        //using var audioConfig = AudioConfig.FromWavFileInput("YourAudioFile.wav");
        using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
        using var speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

        Console.WriteLine("Speak into your microphone.");
        var speechRecognitionResult = await speechRecognizer.RecognizeOnceAsync();
        _service.OutputSpeechRecognitionResult(speechRecognitionResult);
    }
}
class AudioInputCallback : PullAudioInputStreamCallback
{
    private readonly MemoryStream memoryStream;

    public AudioInputCallback(MemoryStream stream)
    {
        this.memoryStream = stream;
    }

    public override int Read(byte[] dataBuffer, uint size)
    {
        return this.Read(dataBuffer, 0, dataBuffer.Length);
    }

    private int Read(byte[] buffer, int offset, int count)
    {
        return memoryStream.Read(buffer, offset, count);
    }

    public override void Close()
    {
        memoryStream.Close();
        base.Close();
    }

}