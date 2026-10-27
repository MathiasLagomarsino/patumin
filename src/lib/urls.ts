/** Next Link prefixes navigation itself; public assets need an explicit basePath. */
export function assetPath(path: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""): string {
  return `${basePath.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/** Preserve the deployment subdirectory when constructing canonical URLs. */
export function absoluteSiteUrl(path: string, siteUrl: string): string {
  return new URL(`${siteUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`).toString();
}
