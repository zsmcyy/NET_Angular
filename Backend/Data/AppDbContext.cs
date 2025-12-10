using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext(DbContextOptions options): DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
}