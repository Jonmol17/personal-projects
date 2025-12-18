using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MashUpServer.Entities
{
    public class UserSettings
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Us_Id { get; set; }

        [BsonElement("temp_scale")]
        public required string Temp_Scale { get; set; }

        [BsonElement("wind_speed")]
        public required string Wind_Speed { get; set; }

        [BsonElement("darkmode")]
        public bool Darkmode { get; set; } = false;
    }
}
