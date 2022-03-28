using Microsoft.AspNetCore.Mvc;
using finalproject.api.Services;
using finalproject.api.Models;

namespace finalproject.api.Controllers;

public class UserController : ControllerBase
{
    private readonly ITableStorageService _storageService;
    public UserController(ITableStorageService storageService)
    {
        _storageService = storageService ?? throw new ArgumentNullException(nameof(storageService));
    }

    [HttpGet]
    [ActionName(nameof(GetAsync))]
    public async Task<IActionResult> GetAsync([FromQuery] string category, string id)
    {
        return Ok(await _storageService.RetrieveAsync(category, id));
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
}