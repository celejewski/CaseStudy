using System.Text.Json.Serialization;

namespace CaseStudy.Core.Models
{
    public class Warehouse
    {
        [JsonPropertyName("_id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }


        [JsonPropertyName("location")]
        public Location Location { get; set; }

        [JsonPropertyName("cars")]
        public Cars Cars { get; set; }
    }
}