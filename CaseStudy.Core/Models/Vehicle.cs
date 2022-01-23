using System;
using System.Text.Json.Serialization;

namespace CaseStudy.Core.Models
{
    public class Vehicle
    {
        public Warehouse Warehouse { get; set; }
        public string Location { get; set; }

        [JsonPropertyName("_id")]
        public int Id { get; set; }

        [JsonPropertyName("make")]
        public string Make { get; set; }

        [JsonPropertyName("model")]
        public string Model { get; set; }


        [JsonPropertyName("year_model")]
        public int YearModel { get; set; }

        [JsonPropertyName("price")]
        public decimal Price { get; set; }


        [JsonPropertyName("licensed")]
        public bool Licensed { get; set; }


        [JsonPropertyName("date_added")]
        public DateTime DateAdded { get; set; }
    }
}