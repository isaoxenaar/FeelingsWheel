using finalproject.api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using System.IO;
using Azure.Storage.Blobs;
using System.Drawing;

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
        Emotion emotion;
        using (var s = new MemoryStream(bytes))
        {
            emotion = await FaceService.DetectFaceExtract(s);
        }
        await _table.InsertOrMergeAsync(new Models.UserEntity()
        {
            PartitionKey = id,
            Name = "aname",
            Emotions = emotion.ToString(),
            RowKey = id,
            Id = id,
        });
        return Ok(emotion);
    }



    [HttpPost("upload")]
    public async Task<IActionResult> uploadPicture(string url)
    {
        return Ok();
    }
}