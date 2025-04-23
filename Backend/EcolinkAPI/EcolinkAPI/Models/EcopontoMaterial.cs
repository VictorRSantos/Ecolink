namespace EcolinkAPI.Models
{
    public class EcopontoMaterial
    {
        public int EcopontoId { get; set; }
        public Ecoponto Ecoponto { get; set; } = null!;
        public int MaterialId { get; set; }
        public Material Material { get; set; } = null!;
    }
}
