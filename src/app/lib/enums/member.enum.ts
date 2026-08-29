export const MemberType = {
  USER: "USER",
  RESTAURANT: "RESTAURANT",
} as const;

export type MemberType = (typeof MemberType)[keyof typeof MemberType];

export const MemberStatus = {
  ACTIVE: "ACTIVE",
  BLOCK: "BLOCK",
  DELETE: "DELETE",
} as const;

export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus];
