using Microsoft.AspNetCore.Mvc;
using finalproject.api.Services;
using finalproject.api.Models;
using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;

namespace finalproject.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ITableStorageService _storageService;
    public UserController(ITableStorageService storageService)
    {
        _storageService = storageService ?? throw new ArgumentNullException(nameof(storageService));

    }

    [HttpGet]
    [ActionName(nameof(GetAsync))]
    public async Task<IActionResult> GetAsync([FromQuery] string name, string id)
    {
        return Ok(await _storageService.RetrieveAsync(name, id));
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] UserEntity entity)
    {
        entity.PartitionKey = entity.Name;
        string Id = Guid.NewGuid().ToString();
        entity.Id = Id;
        entity.RowKey = Id;
        var createdEntity = await _storageService.InsertOrMergeAsync(entity);
        return CreatedAtAction(nameof(GetAsync), createdEntity);
    }

    [HttpPost("{id}/image")]
    public async Task<IActionResult> PostPicture(int id, string image)
    {
        IFaceClient client = FaceService.Authenticate(Environment.GetEnvironmentVariable("FACEAPI_ENDPOINT"), Environment.GetEnvironmentVariable("FACEAPI_KEY"));
        return Ok(image);
    }
}