
using System;
using finalproject.api.Models;
using Microsoft.Azure.Cosmos.Table;

namespace finalproject.api.Services;

public class TableStorageService : ITableStorageService
{
    private const string TableName = "Users";
    private readonly IConfiguration _configuration;
    public TableStorageService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<UserEntity> DeleteAsync(UserEntity user)
    {
        var deleteOperation = TableOperation.Delete(user);
        return await ExecuteTableOperation(deleteOperation) as UserEntity;
    }

    public async Task<UserEntity> InsertOrMergeAsync(UserEntity user)
    {
        var insertOrMergeOperation = TableOperation.InsertOrMerge(user);
        return await ExecuteTableOperation(insertOrMergeOperation) as UserEntity;
    }

    public async Task<UserEntity> RetrieveAsync(string name, string id)
    {
        var retrieveOperation = TableOperation.Retrieve<UserEntity>(name, id);
        return await ExecuteTableOperation(retrieveOperation) as UserEntity;
    }

    private async Task<object> ExecuteTableOperation(TableOperation operation)
    {
        var table = await GetCloudTable();
        var tableResult = await table.ExecuteAsync(operation);
        return tableResult.Result;
    }

    private async Task<CloudTable> GetCloudTable()
    {
        var storageAccount = CloudStorageAccount.Parse(Environment.GetEnvironmentVariable("STORAGE_CONNECTION"));
        var tableClient = storageAccount.CreateCloudTableClient(new TableClientConfiguration());
        var table = tableClient.GetTableReference(TableName);
        await table.CreateIfNotExistsAsync();
        return table;
    }
}