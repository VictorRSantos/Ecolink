using System.Text.Json.Serialization;

namespace EcolinkAPI.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string NomeCompleto { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
        
        [JsonIgnore]
        public ICollection<Ecoponto> Ecopontos { get; set; } = new List<Ecoponto>();

    }
}
