using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CaseStudy.Core.Models
{
    public class Cars
    {
        [JsonPropertyName("location")]
        public string Location { get; set; }


        [JsonPropertyName("vehicles")]
        public IList<Vehicle> Vehicles { get; set; }
    }
}