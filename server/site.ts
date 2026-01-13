"use server";

import { db } from "@/db/drizzle";
import { site, witel, datel } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and, or, like } from "drizzle-orm";
import {
  CreateSiteInput,
  UpdateSiteInput,
  SiteFilters,
  CreateWitelInput,
  UpdateWitelInput,
  CreateDatelInput,
  UpdateDatelInput,
} from "@/types";

// ============================================
// WITEL OPERATIONS
// ============================================

export const createWitel = async (data: CreateWitelInput) => {
  try {
    const id = crypto.randomUUID();
    const [result] = await db
      .insert(witel)
      .values({ id, ...data })
      .returning();

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Witel created successfully",
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to create witel",
    };
  }
};

export const updateWitel = async (id: string, data: UpdateWitelInput) => {
  try {
    const [result] = await db
      .update(witel)
      .set(data)
      .where(eq(witel.id, id))
      .returning();

    if (!result) {
      return {
        success: false,
        message: "Witel not found",
      };
    }

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Witel updated successfully",
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to update witel",
    };
  }
};

export const deleteWitel = async (id: string) => {
  try {
    await db.delete(witel).where(eq(witel.id, id));

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Witel deleted successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete witel",
    };
  }
};

export const getWitel = async (id: string) => {
  try {
    const result = await db.query.witel.findFirst({
      where: eq(witel.id, id),
    });

    if (!result) {
      return {
        success: false,
        message: "Witel not found",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get witel",
    };
  }
};

export const listWitels = async () => {
  try {
    const results = await db.query.witel.findMany({
      orderBy: (witel, { asc }) => [asc(witel.name)],
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to list witels",
    };
  }
};

// ============================================
// DATEL OPERATIONS
// ============================================

export const createDatel = async (data: CreateDatelInput) => {
  try {
    const id = crypto.randomUUID();
    const [result] = await db
      .insert(datel)
      .values({ id, ...data })
      .returning();

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Datel created successfully",
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to create datel",
    };
  }
};

export const updateDatel = async (id: string, data: UpdateDatelInput) => {
  try {
    const [result] = await db
      .update(datel)
      .set(data)
      .where(eq(datel.id, id))
      .returning();

    if (!result) {
      return {
        success: false,
        message: "Datel not found",
      };
    }

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Datel updated successfully",
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to update datel",
    };
  }
};

export const deleteDatel = async (id: string) => {
  try {
    await db.delete(datel).where(eq(datel.id, id));

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Datel deleted successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete datel",
    };
  }
};

export const getDatel = async (id: string) => {
  try {
    const result = await db.query.datel.findFirst({
      where: eq(datel.id, id),
      with: {
        witel: true,
      },
    });

    if (!result) {
      return {
        success: false,
        message: "Datel not found",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get datel",
    };
  }
};

export const listDatels = async (witelId?: string) => {
  try {
    const results = await db.query.datel.findMany({
      where: witelId ? eq(datel.witelId, witelId) : undefined,
      with: {
        witel: true,
      },
      orderBy: (datel, { asc }) => [asc(datel.name)],
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to list datels",
    };
  }
};

// ============================================
// SITE OPERATIONS
// ============================================

export const createSite = async (data: CreateSiteInput) => {
  try {
    const id = crypto.randomUUID();
    const [result] = await db
      .insert(site)
      .values({ id, ...data })
      .returning();

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Site created successfully",
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to create site",
    };
  }
};

export const updateSite = async (id: string, data: UpdateSiteInput) => {
  try {
    const [result] = await db
      .update(site)
      .set(data)
      .where(eq(site.id, id))
      .returning();

    if (!result) {
      return {
        success: false,
        message: "Site not found",
      };
    }

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Site updated successfully",
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to update site",
    };
  }
};

export const deleteSite = async (id: string) => {
  try {
    await db.delete(site).where(eq(site.id, id));

    revalidatePath("/inventory/site");
    return {
      success: true,
      message: "Site deleted successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete site",
    };
  }
};

export const getSite = async (id: string) => {
  try {
    const result = await db.query.site.findFirst({
      where: eq(site.id, id),
      with: {
        witel: true,
        datel: true,
      },
    });

    if (!result) {
      return {
        success: false,
        message: "Site not found",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get site",
    };
  }
};

export const listSites = async (filters?: SiteFilters) => {
  try {
    const conditions = [];

    if (filters?.witelId) {
      conditions.push(eq(site.witelId, filters.witelId));
    }

    if (filters?.datelId) {
      conditions.push(eq(site.datelId, filters.datelId));
    }

    if (filters?.status) {
      conditions.push(eq(site.status, filters.status));
    }

    if (filters?.search) {
      conditions.push(
        or(
          like(site.name, `%${filters.search}%`),
          like(site.code, `%${filters.search}%`),
          like(site.location, `%${filters.search}%`)
        )
      );
    }

    const results = await db.query.site.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: {
        witel: true,
        datel: true,
      },
      orderBy: (site, { asc }) => [asc(site.name)],
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to list sites",
    };
  }
};
