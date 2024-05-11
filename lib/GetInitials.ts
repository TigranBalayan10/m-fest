export function getInitials(name: string): string {
    const nameParts = name.split(" ");
    return `${nameParts[0][0]}${nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : ""}`;
  }