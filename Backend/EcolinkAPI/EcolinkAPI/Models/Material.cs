namespace EcolinkAPI.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public ICollection<EcopontoMaterial> EcopontoMateriais { get; set; } = new List<EcopontoMaterial>();
    }
}
