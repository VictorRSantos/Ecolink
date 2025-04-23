namespace EcolinkAPI.Models
{
    public class ResponseModel<T>
    {
        public T? Dados { get; set; }
        public string Mensagem { get; set; } = null!;
        public bool Status { get; set; } = true;
    }
}
