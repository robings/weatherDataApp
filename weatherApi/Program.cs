using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using weatherApi.Infrastructure;
using weatherApi.Infrastructure.SiteList;

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
builder.Services.Configure<WeatherForecastOptions>(
    builder.Configuration.GetSection(WeatherForecastOptions.WeatherForecastProvider));

var clock = new Clock(() => DateTime.Now);
builder.Services.AddSingleton<IClock>(clock);
builder.Services.AddSingleton<CacheStorage>();
builder.Services.AddSingleton<IWeatherForecastProvider, WeatherForecastProvider>();
builder.Services.AddHttpClient<IWeatherForecastProvider, WeatherForecastProvider>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration.GetSection("WeatherForecastProvider").GetValue<string>("BaseURL"));
});
builder.Services.AddSingleton<IWeatherForecastConvertor, WeatherForecastConvertor>();
builder.Services.AddSingleton<ISiteListConvertor, SiteListConvertor>();
builder.Services.AddSingleton<ISiteListSearcher, SiteListSearcher>();

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
