using finalproject.api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using System.IO;
using Azure.Storage.Blobs;
using System.Drawing;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace finalproject.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FaceController : ControllerBase
{
    private readonly FaceService _service;
    private readonly ITableStorageService _table;
    public FaceController(FaceService service, ITableStorageService table)
    {
        _service = service;
        _table = table;
    }

    [HttpPost("{id}/getResponse")]
    public async Task<ActionResult<Emotion>> postPicture([FromBody] string base64, string id)
    {
        var bytes = Convert.FromBase64String(base64.Substring(base64.IndexOf(',') + 1));
        var user = await _table.RetrieveAsync(id, id);

        Emotion emotion;
        var emotionList = new List<Emotion>();

        using (var s = new MemoryStream(bytes))
        {
            emotion = await FaceService.DetectFaceExtract(s);
        }

        if (user == null)
        {
            user = new Models.UserEntity()
            {
                PartitionKey = id,
                RowKey = id,
                Id = id,
            };
        }

        if (string.IsNullOrEmpty(user.Emotions))
        {
            emotionList.Add(emotion);
            user.Emotions = JsonConvert.SerializeObject(emotionList);
        }
        else
        {
            emotionList = JsonConvert.DeserializeObject<List<Emotion>>(user.Emotions);
            emotionList.Add(emotion);
            user.Emotions = JsonConvert.SerializeObject(emotionList);
        }

        await _table.InsertOrMergeAsync(new Models.UserEntity()
        {
            PartitionKey = id,
            Emotions = user.Emotions, //emotionsString.
            RowKey = id,
            Id = id,
        });
        return Ok(emotion);
    }
}