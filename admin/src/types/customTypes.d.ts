declare global {
  interface UserPublicMetadata {
    roles: {
      [key: string]: "user" | "moderator" | "admin";
    };
  }
}

export {};
