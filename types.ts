// Type definitions for permit orders
export type PermitStatus = "Approved" | "Pending" | "Rejected";

export interface PermitOrder {
  id: string;
  permitType: string;
  applicantName: string;
  permitHolder: string;
  issueDate: string;
  expiryDate: string;
  location: string;
  status: PermitStatus;
  qrCodeRef: string;
  zone: string;
  reference: string;
}

// Site Management Types
export type SiteStatus = "Active" | "Inactive";

export interface Witel {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Datel {
  id: string;
  name: string;
  code: string;
  witelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Site {
  id: string;
  name: string;
  code: string;
  witelId: string;
  datelId: string;
  location: string;
  latitude?: string;
  longitude?: string;
  status: SiteStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Input Types for Server Actions
export interface CreateWitelInput {
  name: string;
  code: string;
}

export interface UpdateWitelInput {
  name?: string;
  code?: string;
}

export interface CreateDatelInput {
  name: string;
  code: string;
  witelId: string;
}

export interface UpdateDatelInput {
  name?: string;
  code?: string;
  witelId?: string;
}

export interface CreateSiteInput {
  name: string;
  code: string;
  witelId: string;
  datelId: string;
  location: string;
  latitude?: string;
  longitude?: string;
  status?: SiteStatus;
}

export interface UpdateSiteInput {
  name?: string;
  code?: string;
  witelId?: string;
  datelId?: string;
  location?: string;
  latitude?: string;
  longitude?: string;
  status?: SiteStatus;
}

export interface SiteFilters {
  witelId?: string;
  datelId?: string;
  status?: SiteStatus;
  search?: string;
}
