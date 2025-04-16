using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinalExam.Models;

public partial class EntertainmentAgencyExampleContext : DbContext
{
    public EntertainmentAgencyExampleContext()
    {
    }

    public EntertainmentAgencyExampleContext(DbContextOptions<EntertainmentAgencyExampleContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Engagement> Engagements { get; set; }

    public virtual DbSet<Entertainer> Entertainers { get; set; }
}
