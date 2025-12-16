using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MashUpServer.Entities
{
     public class User
     {
         [BsonId]
         [BsonElement("user_id"), BsonRepresentation(BsonType.ObjectId)]
         public int User_Id { get; set; }

         [BsonElement("username"), BsonRepresentation(BsonType.String)]
         public string Username { get; set; }

         [BsonElement("password_hashed"), BsonRepresentation(BsonType.String)]
         public string Password_Hashed { get; set; }

         [BsonElement("created_at"), BsonRepresentation(BsonType.DateTime)]
         public DateOnly Created_At { get; set; }
     }
}