using EcolinkAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcolinkAPI.Data
{
    public class SeedData
    {
        public static void Inicializar(IServiceProvider serviceProvider)
        {
            using var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());
            if (!context.Materiais.Any())
            {
                var materiais = new[]
                {
                new Material { Nome = "Plástico" },
                new Material { Nome = "Papel" },
                new Material { Nome = "Vidro" },
                new Material { Nome = "Metal" },
                new Material { Nome = "Eletrônicos" }
            };

                context.Materiais.AddRange(materiais);
                context.SaveChanges();
            }
        }

    }
}
