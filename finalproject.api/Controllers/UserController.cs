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

    [HttpGet("{id}")]
    [ActionName(nameof(GetAsync))]
    public async Task<IActionResult> GetAsync(string id)
    {
        return Ok(await _storageService.RetrieveAsync(id, id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveDataAsync(string id)
    {
        var user = await _storageService.RetrieveAsync(id, id);
        await _storageService.DeleteAsync(user);
        return NoContent();
    }
}