using finalproject.api.Models;

namespace finalproject.api.Services;

public interface ITableStorageService
{
    Task<UserEntity> RetrieveAsync(string name, string id);
    Task<UserEntity> InsertOrMergeAsync(UserEntity user);

    Task<UserEntity> DeleteAsync(UserEntity id);
}