import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const DUMMY_IMG =
  "https://github.com/rotaractgalgotias/images/blob/main/cover/03720795-b96e-4f11-8746-b47908e88548.jpg?raw=true";

export async function POST() {
  try {
    // Hash the password for the admin user
    const adminPassword = await bcrypt.hash("12345678", 8);

    // Create the admin user
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "ADMIN",
        verified: true,
      },
    });

    // Seed Years
    const year2024 = await prisma.year.create({
      data: {
        year: 2024,
        imageUrl: `${DUMMY_IMG}/year2024.png`,
      },
    });

    const year2025 = await prisma.year.create({
      data: {
        year: 2025,
        imageUrl: `${DUMMY_IMG}/year2025.png`,
      },
    });

    // Seed Members
    const member1 = await prisma.member.create({
      data: {
        name: "John Doe",
        imageUrl: `${DUMMY_IMG}`,
      },
    });

    const member2 = await prisma.member.create({
      data: {
        name: "Jane Smith",
        imageUrl: `${DUMMY_IMG}`,
      },
    });

    // Seed Member Roles
    await prisma.memberRole.createMany({
      data: [
        {
          memberId: member1.id,
          yearId: year2024.id,
          position: "PRESIDENT",
          memberType: "COUNCIL",
        },
        {
          memberId: member2.id,
          yearId: year2025.id,
          position: "SECRETARY",
          memberType: "DIRECTOR",
        },
      ],
    });

    // Seed Events
    await prisma.event.createMany({
      data: [
        {
          title: "Community Clean-Up Drive",
          slug: "community-clean-up",
          description: "A drive to clean up the local park.",
          content: `# Join us for a community effort!
- Date: 2024-03-15
- Location: Central Park
- Volunteers Needed: 50
- People Impacted: 200
- Duration: 5 hours`,
          date: new Date("2024-03-15"),
          location: "Central Park",
          numberOfVolunteers: 50,
          peopleImpacted: 200,
          duration: 5,
          coverImage: `${DUMMY_IMG}`,
          yearId: year2024.id,
        },
        {
          title: "Tree Planting Campaign",
          slug: "tree-planting",
          description: "Planting trees to save the environment.",
          content: `# Make a difference!
- Date: 2025-04-22
- Location: Riverside Park
- Volunteers Needed: 30
- People Impacted: 100
- Duration: 3 hours`,
          date: new Date("2025-04-22"),
          location: "Riverside Park",
          numberOfVolunteers: 30,
          peopleImpacted: 100,
          duration: 3,
          coverImage: `${DUMMY_IMG}`,
          yearId: year2025.id,
        },
      ],
    });

    // Seed Activity Logs
    await prisma.activityLog.createMany({
      data: [
        { action: "CREATE", details: "Admin User created an event." },
        {
          action: "UPDATE",
          details: "John Doe updated the event description.",
        },
      ],
    });

    return NextResponse.json({
      message: "Admin user added and database seeded successfully!",
      adminUser,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { error: "Failed to seed database." },
      { status: 500 }
    );
  }
}
