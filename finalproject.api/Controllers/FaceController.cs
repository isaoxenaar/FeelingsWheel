using finalproject.api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;

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

    [HttpPost]
    public async Task<IActionResult> postPicture(string url)
    {
        var client = FaceService.Authenticate(Environment.GetEnvironmentVariable("FACEAPI_ENDPOINT"), Environment.GetEnvironmentVariable("FACEAPI_KEY"));
        await FaceService.DetectFaceExtract(client, url, RecognitionModel.Recognition04);
        return Ok();
    }

}