using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MashUpServer.Entities
{
     public class Favorite
     {
        [BsonId]
        [BsonElement("user_id"), BsonRepresentation(BsonType.ObjectId)]
        public int Favorite_Id { get; set; }

        [BsonElement("city"), BsonRepresentation(BsonType.String)]
        public string City { get; set; }
        
        [BsonElement("country"), BsonRepresentation(BsonType.String)]
        public string Country { get; set; }
     }
}