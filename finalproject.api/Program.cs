using finalproject.api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(e => e.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Finalproject Api", Version = "v1" }));

builder.Services.AddScoped<FaceService>();
builder.Services.AddScoped<ITableStorageService, TableStorageService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Finalproject Api v1"));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
