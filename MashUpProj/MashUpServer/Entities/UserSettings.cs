using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MashUpServer.Entities
{
     public class UserSettings
     {
        [BsonId]
        [BsonElement("us_id"), BsonRepresentation(BsonType.ObjectId)]
        public int Us_Id { get; set; }
        
        [BsonElement("temp_scale"), BsonRepresentation(BsonType.String)]
        public required string Temp_Scale { get; set; }

        [BsonElement("wind_speed"), BsonRepresentation(BsonType.String)]
        public required string Wind_Speed { get; set; }

        [BsonElement("darkmode"), BsonRepresentation(BsonType.Boolean)]
        public bool Darkmode { get; set; } = false;
     }
}