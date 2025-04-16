using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalExam.Models;

namespace FinalExam.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private EntertainmentAgencyExampleContext _EntertainerContext;

        public EntertainerController(EntertainmentAgencyExampleContext context)
        {
            _EntertainerContext = context;
        }

        public class EntertainerDetailsDto
        {
            public int EntertainerId { get; set; }
            public string? EntStageName { get; set; }
            public string? EntSsn { get; set; }
            public string? EntStreetAddress { get; set; }
            public string? EntCity { get; set; }
            public string? EntState { get; set; }
            public string? EntZipCode { get; set; }
            public string? EntPhoneNumber { get; set; }
            public string? EntWebPage { get; set; }
            public string? EntEmailAddress { get; set; }
            public DateOnly? DateEntered { get; set; }

            public int BookingCount { get; set; }
            public DateOnly? LastBookingDate { get; set; }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntertainerDetailsDto>>> GetEntertainersWithBookingInfo()
        {
            var entertainers = await _EntertainerContext.Entertainers
                .Select(e => new EntertainerDetailsDto
                {
                    EntertainerId = e.EntertainerId,
                    EntStageName = e.EntStageName,
                    EntCity = e.EntCity,
                    EntEmailAddress = e.EntEmailAddress,

                    BookingCount = _EntertainerContext.Engagements
                        .Count(en => en.EntertainerId == e.EntertainerId),

                    LastBookingDate = _EntertainerContext.Engagements
                        .Where(en => en.EntertainerId == e.EntertainerId && en.StartDate != null)
                        .OrderByDescending(en => en.StartDate)
                        .Select(en => en.StartDate)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(entertainers);
        }

        [HttpGet("{EntertainerId}")]
        public async Task<ActionResult<Entertainer>> GetDetails(int EntertainerId)
        {
            var entertainer = await _EntertainerContext.Entertainers
                .FindAsync(EntertainerId);

            if (entertainer == null)
            {
                return NotFound();
            }

            return Ok(entertainer);
        }

        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _EntertainerContext.Entertainers.Add(newEntertainer);
            _EntertainerContext.SaveChanges();
            return Ok(newEntertainer);
        }

        [HttpDelete("DeleteEntertainer/{EntertainerId}")]
        public IActionResult DeleteEntertainer(int EntertainerId)
        {
            var person = _EntertainerContext.Entertainers.Find(EntertainerId);

            if (person == null)
            {
                return NotFound(new { message = "entertainer Not Found" });
            }

            _EntertainerContext.Entertainers.Remove(person);
            _EntertainerContext.SaveChanges();

            return NoContent();

        }

        [HttpPut("UpdateEntertainer/{entertainerId}")]
        public IActionResult UpdateEntertainer(int entertainerId, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _EntertainerContext.Entertainers.Find(entertainerId);

            if (existingEntertainer == null)
            {
                return NotFound($"Entertainer with ID {entertainerId} not found.");
            }

            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSsn = updatedEntertainer.EntSsn;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
            existingEntertainer.EntEmailAddress = updatedEntertainer.EntEmailAddress;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;

            _EntertainerContext.Entertainers.Update(existingEntertainer);
            _EntertainerContext.SaveChanges();

            return Ok(existingEntertainer);
        }

    }
}
