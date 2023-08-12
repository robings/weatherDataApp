export interface SiteListResponse {
  sites: Array<Site>;
}

export interface Site {
  id: number;
  name: string;
}
