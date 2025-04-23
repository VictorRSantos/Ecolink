namespace EcolinkAPI.Models
{
    public class Ecoponto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public string? Endereco { get; set; }
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public string? Cep { get; set; }
        public string Cnpj { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
        public ICollection<EcopontoMaterial> EcopontoMateriais { get; set; } = new List<EcopontoMaterial>();
    }
}
