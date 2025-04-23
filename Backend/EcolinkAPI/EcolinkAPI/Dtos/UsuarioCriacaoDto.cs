namespace EcolinkAPI.Dtos
{
    public class UsuarioCriacaoDto
    {
        public string NomeCompleto { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string ConfirmarSenha { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;

    }
}
