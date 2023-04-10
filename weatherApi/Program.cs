using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using weatherApi.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_allowedOrigins",
                      builder =>
                      {
                          builder.WithOrigins(allowedOrigins);
                      });
});
builder.Services.AddControllers();

var clock = new Clock(() => DateTime.Now);
builder.Services.AddSingleton<IClock>(clock);

builder.Services.AddSingleton<IWeatherForecastConvertor, WeatherForecastConvertor>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("_allowedOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
