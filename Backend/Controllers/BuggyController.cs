using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("auth")]   // 身份验证
    public IActionResult GetAuth()
    {
        return Unauthorized();
    }
    
    [HttpGet("not-found")]  // 未发现
    public IActionResult GetNotFound()
    {
        return NotFound();
    }
    
    [HttpGet("server-error")]   // 服务器错误
    public IActionResult GetServerError()
    {
        throw new Exception("This is a server error");
    }
    
    [HttpGet("bad-request")]    // 请求错误
    public IActionResult GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }
}