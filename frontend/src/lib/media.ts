export const mediaUrl = (path?: string | null): string =>
  path ? `/storage/${path.replace(/^\/+/, '')}` : ''
