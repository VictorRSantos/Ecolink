using EcolinkAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcolinkAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<UsuarioModel> Usuarios => Set<UsuarioModel>();
        public DbSet<Ecoponto> Ecopontos => Set<Ecoponto>();
        public DbSet<Material> Materiais => Set<Material>();
        public DbSet<EcopontoMaterial> EcopontoMateriais => Set<EcopontoMaterial>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração de Usuario
            modelBuilder.Entity<UsuarioModel>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<UsuarioModel>()
                .HasIndex(u => u.Cnpj)
                .IsUnique();

            // Configuração de Ecoponto
            modelBuilder.Entity<Ecoponto>()
                .HasOne(e => e.Usuario)
                .WithMany(u => u.Ecopontos)
                .HasForeignKey(e => e.UsuarioId);

            modelBuilder.Entity<Ecoponto>()
                .HasIndex(e => e.Cnpj)
                .IsUnique();

            // Configuração de Material
            modelBuilder.Entity<Material>()
                .HasIndex(m => m.Nome)
                .IsUnique();

            // Configuração de EcopontoMaterial (tabela de junção)
            modelBuilder.Entity<EcopontoMaterial>()
                .HasKey(em => new { em.EcopontoId, em.MaterialId });

            modelBuilder.Entity<EcopontoMaterial>()
                .HasOne(em => em.Ecoponto)
                .WithMany(e => e.EcopontoMateriais)
                .HasForeignKey(em => em.EcopontoId);

            modelBuilder.Entity<EcopontoMaterial>()
                .HasOne(em => em.Material)
                .WithMany(m => m.EcopontoMateriais)
                .HasForeignKey(em => em.MaterialId);

        }
    }
}