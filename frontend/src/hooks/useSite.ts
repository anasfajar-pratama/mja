import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import type { SiteData } from '../types'

export function useSite() {
  return useQuery<SiteData>({
    queryKey: ['site'],
    queryFn: async () => (await api.get<SiteData>('/site')).data,
    staleTime: 30_000,
  })
}
