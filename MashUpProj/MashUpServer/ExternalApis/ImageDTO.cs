
namespace MashUpServer.ExternalApis
{
    public class ImageDTO
    {
        public List<ResultsDTO> results { get; set; }

        public class ResultsDTO
        {
            public string id { get; set; }
            public string description { get; set; }
            public string alt_description { get; set; }
            public UrlsDTO urls { get; set; }
        }

        public class UrlsDTO
        {
            public string regular { get; set; }
        }
    }
}
    