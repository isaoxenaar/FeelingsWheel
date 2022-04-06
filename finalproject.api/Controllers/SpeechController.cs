using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using finalproject.api.Services;
using Microsoft.CognitiveServices.Speech.Audio;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Web;

namespace finalproject.api;

[ApiController]
[Route("api/[controller]")]
public class SpeechController : ControllerBase
{
    static string YourSubscriptionKey = "9d33b42d39714ae7af0764e1767e8bec";
    static string YourServiceRegion = "westeurope";

    private readonly SpeechService _service;
    private readonly ITableStorageService _table;

    public SpeechController(SpeechService service, ITableStorageService table)
    {
        _service = service;
        _table = table;
    }
    
    [HttpPost("{id}")]
    public async Task<ActionResult<object>> postAudio(string id)
    {
        var user = await _table.RetrieveAsync(id, id);

        var speechConfig = SpeechConfig.FromSubscription(YourSubscriptionKey, YourServiceRegion);
        speechConfig.SpeechRecognitionLanguage = "en-US";

        using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
        using var speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

        Console.WriteLine("Speak into your microphone.");
        
        var speechRecognitionResult = await speechRecognizer.RecognizeOnceAsync();
        //speechRecognizer.StopContinuousRecognitionAsync();
        Console.WriteLine("Speech detected: " + speechRecognitionResult.Text.ToLower());
        var response = speechRecognitionResult.Text.ToLower();

        var txtSentiment = await _service.GetTextSentiment(speechRecognitionResult.Text);

        // Console.WriteLine(txtSentiment);

        await _table.InsertOrMergeAsync(new Models.UserEntity()
        {
            PartitionKey = id,
            Emotions = user.Emotions,
            textEmotion = response,
            textSentiment = txtSentiment,
            RowKey = id,
            Id = id,
        });

        var obj = JsonConvert.SerializeObject(response);
        return Ok(obj);
    }
}
    //[HttpPost("/test")]

    // public async Task test()
    // {
    //     var speechConfig = SpeechConfig.FromSubscription(YourSubscriptionKey, YourServiceRegion);
    //     speechConfig.SpeechRecognitionLanguage = "en-US";

    //     using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
    //     using var recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    //     var stopRecognition = new TaskCompletionSource<int>();

    //     recognizer.Recognizing += (s, e) =>
    //     {
    //         Console.WriteLine($"RECOGNIZING: Text={e.Result.Text}");
    //     };

    //     recognizer.Recognized += (s, e) =>
    //     {
    //         if (e.Result.Reason == ResultReason.RecognizedSpeech)
    //         {
    //             Console.WriteLine($"RECOGNIZED: Text={e.Result.Text}");
    //         }
    //         else if (e.Result.Reason == ResultReason.NoMatch)
    //         {
    //             Console.WriteLine($"NOMATCH: Speech could not be recognized.");
    //         }
    //     };

    //     recognizer.Canceled += (s, e) =>
    //     {
    //         Console.WriteLine($"CANCELED: Reason={e.Reason}");

    //         if (e.Reason == CancellationReason.Error)
    //         {
    //             Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
    //             Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
    //             Console.WriteLine($"CANCELED: Did you update the speech key and location/region info?");
    //         }

    //         stopRecognition.TrySetResult(0);
    //     };

    //     recognizer.SessionStopped += (s, e) =>
    //     {
    //         Console.WriteLine("\n    Session stopped event.");
    //         stopRecognition.TrySetResult(0);
    //     };

    //     await recognizer.StartContinuousRecognitionAsync();
    //     Task.WaitAny(new[] { stopRecognition.Task });
    //     Thread.Sleep(5000);
    //     await recognizer.StopContinuousRecognitionAsync();
    // }
//}


