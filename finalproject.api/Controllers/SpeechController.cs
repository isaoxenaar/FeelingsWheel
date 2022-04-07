using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using finalproject.api.Services;
using Microsoft.CognitiveServices.Speech.Audio;
using Newtonsoft.Json;

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

        var speechRecognitionResult = await speechRecognizer.RecognizeOnceAsync();
        var response = speechRecognitionResult.Text.ToLower();

        var txtSentiment = await _service.GetTextSentiment(speechRecognitionResult.Text);

        Console.WriteLine(txtSentiment);

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


