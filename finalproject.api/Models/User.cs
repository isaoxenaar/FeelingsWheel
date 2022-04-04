using Microsoft.Azure.Cosmos.Table;

namespace finalproject.api.Models;

public class UserEntity : TableEntity
{
    public string Id { get; set; }
    public string Emotions { get; set; }

}