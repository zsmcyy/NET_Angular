using System.Net;
using System.Text.Json;
using Backend.Errors;

namespace Backend.Middleware;

public class ExceptionMiddleware(RequestDelegate next, 
    ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
{
    // 因为是发生错误的中间件，
    // 没有错误时，直接 next 下一个中间件，
    // 有错误时，将错误信息存入 logger 中
    // 返回类型，返回状态码。
    // 判断是否为开发模式，如果是返回完整的堆栈跟踪，如果不是返回堆栈跟踪
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            logger.LogError(e, "{message}", e.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            
            var response = env.IsDevelopment() 
                ? new ApiException(context.Response.StatusCode, e.Message, e.StackTrace)
                : new ApiException(context.Response.StatusCode, e.Message, "Internal server error");

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            var json = JsonSerializer.Serialize(response, options);
            
            await context.Response.WriteAsync(json);
        }
    }
}