using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MashUpServer.Entities
{
     public class Favorite
     {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Favorite_Id { get; set; }

        [BsonElement("city")]
        public string City { get; set; }
        
        [BsonElement("country")]
        public string Country { get; set; }
     }
}