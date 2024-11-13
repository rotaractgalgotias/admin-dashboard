import { MemberType, Position } from "@prisma/client";

export const councilPositions = [
  Position.PRESIDENT,
  Position.SECRETARY,
  Position.VICE_PRESIDENT,
  Position.SERGEANT_AT_ARMS,
  Position.JOINT_SECRETARY,
  Position.TREASURER,
  Position.PUBLIC_RELATION_OFFICER,
];

export const directorAndCoordinatorPositions = [
  Position.CLUB_SERVICE,
  Position.COMMUNITY_SERVICE,
  Position.VOCATIONAL_SERVICE,
  Position.INTERNATIONAL_SERVICE,
  Position.LITERARY_SERVICE,
  Position.MULTIMEDIA_SERVICE,
  Position.PUBLIC_RELATION_SERVICES,
  Position.PHOTOGRAPHY_SERVICE,
  Position.SOCIAL_MEDIA,
  Position.PERFORMING_ARTS_HEAD,
  Position.TECHNICAL_SERVICES,
  Position.MANAGEMENT_TEAM_HEAD,
];

export const allPositions = [
  ...councilPositions,
  ...directorAndCoordinatorPositions,
  Position.MEMBER,
];

export const memberTypes = [
  MemberType.COUNCIL,
  MemberType.DIRECTOR,
  MemberType.COORDINATOR,
  MemberType.MEMBER,
];
