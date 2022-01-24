using System.Collections.Generic;

namespace CaseStudy.Web.Dtos
{
    public class ShoppingCart
    {
        public decimal Total { get; set; }
        public IEnumerable<Car> Cars { get; set; }
    }
}