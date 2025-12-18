using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MashUpServer.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string User_Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("password_hashed")]
        public string Password_Hashed { get; set; }

        [BsonElement("created_at")]
        public DateTime Created_At { get; set; }
    }
}
