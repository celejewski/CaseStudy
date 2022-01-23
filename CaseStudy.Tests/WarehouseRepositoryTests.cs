using CaseStudy.Core.DataLayer;
using CaseStudy.Core.Models;
using FluentAssertions;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CaseStudy.Tests
{
    public class WarehouseRepositoryTests
    {
        [Fact]
        public async Task GetVehiclesOrderByDateAdded_should_return_vehicles_from_all_warehouses_ordered_by_date_added()
        {
            var warehouses = new[]
            {
                new Warehouse
                {
                    Cars = new Cars
                    {
                        Vehicles = new[]
                        {
                            new Vehicle {Id = 4, DateAdded = new DateTime(2020, 01, 04)},
                            new Vehicle {Id = 2, DateAdded = new DateTime(2020, 01, 02)},
                            new Vehicle {Id = 3, DateAdded = new DateTime(2020, 01, 03)},
                        }
                    }
                },
                new Warehouse
                {
                    Cars = new Cars
                    {
                        Vehicles = new[]
                        {
                            new Vehicle {Id = 5, DateAdded = new DateTime(2020, 01, 05)},
                            new Vehicle {Id = 1, DateAdded = new DateTime(2020, 01, 01)},
                        }
                    }
                }
            };
            var mock = new Mock<IWarehouseProvider>();
            mock.Setup(w => w.GetWarehouses()).ReturnsAsync(warehouses);

            var carRepository = new CarRepository(mock.Object);
            var sut = await carRepository.GetVehiclesOrderedByDateAdded();

            sut.Should().HaveCount(5);
            sut[0].Id.Should().Be(1);
            sut[1].Id.Should().Be(2);
            sut[2].Id.Should().Be(3);
            sut[3].Id.Should().Be(4);
            sut[4].Id.Should().Be(5);
        }
    }
}