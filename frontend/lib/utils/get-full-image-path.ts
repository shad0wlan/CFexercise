export function getFullImagePath(path: string) {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${path}`;
}
