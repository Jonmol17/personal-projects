namespace MashUpServer.Dtos
{
    public class UserDTO
    {
        public int User_id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password_Hashed { get; set; } = string.Empty;
        public DateOnly Created_At { get; set; }
    }
}