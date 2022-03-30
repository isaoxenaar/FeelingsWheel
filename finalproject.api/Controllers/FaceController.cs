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
    public FaceController(FaceService service)
    {
        _service = service;
    }

    [HttpPost("getResponse")]
    public async Task<ActionResult<Emotion>> postPicture([FromBody] string url)
    {
        var photo64 = url;
        Console.WriteLine("base 64" + photo64);
        var client = FaceService.Authenticate("https://faceapiforfinalproject.cognitiveservices.azure.com/", "501fd120b8b34c588c4273551b0d2179");
        var face = await FaceService.DetectFaceExtract(client, url, RecognitionModel.Recognition04);
        return Ok(face);
    }
    [HttpPost("upload")]
    public async Task<IActionResult> uploadPicture(string url)
    {
        return Ok();
    }
}