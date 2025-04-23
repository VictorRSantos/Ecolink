namespace EcolinkAPI.Dtos
{
    public class UsuarioEdicaoDto
    {
        public int Id { get; set; }
        public string NomeCompleto { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;

    }
}
