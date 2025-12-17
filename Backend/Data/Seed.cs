using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Backend.DTOs;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext context)
    {
        // 首先检查数据库中是否已有数据
        if (await context.Users.AnyAsync()) return;
        
        // 将数据文件读取出来
        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        
        // 将数据映射到 SeedUserDto 上
        var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);

        if (members == null)
        {
            Console.WriteLine("Error: Member data is null");
            return;
        }
        
        // 遍历 members 列表
        foreach (var member in members)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = member.Id,
                Email = member.Email,
                DisplayName = member.DisplayName,
                ImageUrl = member.ImageUrl,
                PassWordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("111111")),
                PassWordSalt = hmac.Key,
                Member = new Member
                {
                    Id = member.Id,
                    DisplayName = member.DisplayName,
                    Description = member.Description,
                    DateOfBirth = member.DateOfBirth,
                    ImageUrl = member.ImageUrl,
                    Gender = member.Gender,
                    City = member.City,
                    Country = member.Country,
                    LastActive = member.LastActive,
                    Created = member.Created
                }
            };
            
            user.Member.Photos.Add(new Photo
            {
                Url = member.ImageUrl!,
                MemberId = member.Id
            });
            
            context.Users.Add(user);
        }
        
        await context.SaveChangesAsync();
    }
}