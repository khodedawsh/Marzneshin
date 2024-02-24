

export class PageSizeManager {
  private localStorageKey: string;
  private defaultPageSize: number;

  constructor(localStorageKey: string, defaultPageSize: number) {
    this.localStorageKey = `marzneshin-num-${localStorageKey}-per-page`;
    this.defaultPageSize = defaultPageSize;
  }

  private getStoredPageSize(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

  getPageSize(): number {
    const storedPageSize = this.getStoredPageSize();
    const parsedPageSize = parseInt(storedPageSize || '', 10);
    return isNaN(parsedPageSize) ? this.defaultPageSize : parsedPageSize;
  }

  setPageSize(value: string): void {
    localStorage.setItem(this.localStorageKey, value);
  }
}

const usersPageSizeManager = new PageSizeManager('users', 10);
const servicesPageSizeManager = new PageSizeManager('services', 10);
const nodesPageSizeManager = new PageSizeManager('nodes', 10);
const hostsPageSizeManager = new PageSizeManager('hosts', 10);

export const pageSizeManagers = {
  users: usersPageSizeManager,
  nodes: nodesPageSizeManager,
  hosts: hostsPageSizeManager,
  services: servicesPageSizeManager,
}
