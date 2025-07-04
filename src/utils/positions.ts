import { MemberType, Position } from "@prisma/client";

export const councilPositions = [
  Position.PRESIDENT,
  Position.SECRETARY,
  Position.VICE_PRESIDENT,
  Position.SERGEANT_AT_ARMS,
  Position.JOINT_SECRETARY,
  Position.TREASURER,
  Position.DIRECTORIAL_COMMITTEE_CHAIR,
  Position.PUBLIC_RELATION_OFFICER,
];

export const directorAndCoordinatorPositions = [
  Position.COMMUNITY_SERVICE,
  Position.INTERNATIONAL_SERVICE,
  Position.PUBLIC_RELATION_SERVICES,
  Position.LITERARY_SERVICE,
  Position.CLUB_SERVICE,
  Position.MANAGEMENT_TEAM_HEAD,
  Position.PROFESSIONAL_DEVELOPMENT,
  Position.PERFORMING_ARTS_HEAD,
  Position.SOCIAL_MEDIA,  
  Position.MEDIA_SERVICE,
  Position.TECHNICAL_SERVICES,
];

export const allPositions: Position[] = [
  ...directorAndCoordinatorPositions,
  Position.MEMBER,
];

export const memberTypes = [
  MemberType.COUNCIL,
  MemberType.DIRECTOR,
  MemberType.COORDINATOR,
  MemberType.MEMBER,
];

// Only these domains for Directors and Coordinators
export const domainPositions = {
  COMMUNITY_SERVICES: [Position.COMMUNITY_SERVICE],
  INTERNATIONAL_SERVICES: [Position.INTERNATIONAL_SERVICE],
  PUBLIC_RELATIONS: [Position.PUBLIC_RELATION_SERVICES],
  LITERARY_SERVICES: [Position.LITERARY_SERVICE],
  CLUB_SERVICES: [Position.CLUB_SERVICE],
  MANAGEMENT_SERVICES: [Position.MANAGEMENT_TEAM_HEAD],
  PROFESSIONAL_DEVELOPMENT: [Position.PROFESSIONAL_DEVELOPMENT],
  PERFORMING_ARTS: [Position.PERFORMING_ARTS_HEAD],
  SOCIAL_MEDIA_SERVICES: [Position.SOCIAL_MEDIA],
  MEDIA_SERVICES: [Position.MEDIA_SERVICE],
  TECHNICAL_SERVICES: [Position.TECHNICAL_SERVICES],
};

export const domainNames = {
  COMMUNITY_SERVICES: "Community Services",
  INTERNATIONAL_SERVICES: "International Services",
  PUBLIC_RELATIONS: "Public Relations",
  LITERARY_SERVICES: "Literary Services",
  CLUB_SERVICES: "Club Services",
  MANAGEMENT_SERVICES: "Management Services",
  PROFESSIONAL_DEVELOPMENT: "Professional Development",
  PERFORMING_ARTS: "Performing Arts",
  SOCIAL_MEDIA_SERVICES: "Social Media Services",
  MEDIA_SERVICES: "Media Services",
  TECHNICAL_SERVICES: "Technical Services",
};

export const getPositionsByDomain = (domain: keyof typeof domainPositions) => {
  return domainPositions[domain] || [];
};

export const getDomainKeys = () => Object.keys(domainPositions) as (keyof typeof domainPositions)[];
