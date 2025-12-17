-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "ActivityActions" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('COUNCIL', 'DIRECTOR', 'COORDINATOR', 'MEMBER');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('PRESIDENT', 'SECRETARY', 'VICE_PRESIDENT', 'SERGEANT_AT_ARMS', 'JOINT_SECRETARY', 'TREASURER', 'DIRECTORIAL_COMMITTEE_CHAIR', 'PUBLIC_RELATION_OFFICER', 'CLUB_SERVICE', 'COMMUNITY_SERVICE', 'VOCATIONAL_SERVICE', 'INTERNATIONAL_SERVICE', 'LITERARY_SERVICE', 'MEDIA_SERVICE', 'PUBLIC_RELATION_SERVICES', 'PROFESSIONAL_DEVELOPMENT', 'SOCIAL_MEDIA', 'PERFORMING_ARTS_HEAD', 'TECHNICAL_SERVICES', 'MANAGEMENT_TEAM_HEAD', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'EDITOR',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "firstTime" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "numberOfVolunteers" INTEGER,
    "peopleImpacted" INTEGER,
    "duration" INTEGER,
    "coverImage" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "yearId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "action" "ActivityActions" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Year" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collegeId" TEXT NOT NULL DEFAULT 'cm3lmrtyx0000xz75u4u9jg35',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "phone" TEXT,
    "year" TEXT,
    "branch" TEXT,
    "whatsappNumber" TEXT,
    "referralSource" TEXT,
    "membershipType" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "whatsappGroupLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberRole" (
    "id" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "memberType" "MemberType" NOT NULL,
    "yearId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "MemberRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "month" TEXT NOT NULL,
    "totalPages" INTEGER NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "yearId" TEXT,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Year_year_key" ON "Year"("year");

-- CreateIndex
CREATE UNIQUE INDEX "MemberRole_memberId_yearId_key" ON "MemberRole"("memberId", "yearId");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_slug_key" ON "Newsletter"("slug");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRole" ADD CONSTRAINT "MemberRole_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRole" ADD CONSTRAINT "MemberRole_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Newsletter" ADD CONSTRAINT "Newsletter_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;
