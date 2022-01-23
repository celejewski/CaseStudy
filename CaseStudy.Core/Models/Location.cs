using System.Text.Json.Serialization;

namespace CaseStudy.Core.Models
{
    public class Location
    {
        [JsonPropertyName("lat")]
        public string Latitude { get; set; }

        [JsonPropertyName("long")]
        public string Longitude { get; set; }
    }
}