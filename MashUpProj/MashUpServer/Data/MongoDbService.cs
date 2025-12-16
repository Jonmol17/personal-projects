using MongoDB.Driver;

namespace MashUpServer.Data
{
    public class MongoDbService
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase? _database;

        public MongoDbService(IConfiguration configuration)
        {
            _configuration = configuration;

            var mongoUrl = configuration["MONGO_URL"];
            var dbName = configuration["MONGO_DB_NAME"];

            if (string.IsNullOrEmpty(mongoUrl))
            {
                throw new ArgumentNullException("DB URL NOT FOUND!");
            }

            if (string.IsNullOrEmpty(dbName))
            {
                throw new ArgumentNullException("DB NOT FOUND!");
            }

            var client = new MongoClient(mongoUrl); 
            _database = client.GetDatabase(dbName);
        }

        public IMongoDatabase? Database => _database;
    }
}