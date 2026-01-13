import { NextRequest, NextResponse } from "next/server";
import {
  listSites,
  getSite,
  createSite,
  updateSite,
  deleteSite,
} from "@/server/site";

// GET /api/site - List all sites with optional filters
// Query params: witelId, datelId, status, search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const siteId = searchParams.get("id");

    // Get single site by ID
    if (siteId) {
      const result = await getSite(siteId);
      if (!result.success) {
        return NextResponse.json({ error: result.message }, { status: 404 });
      }
      return NextResponse.json(result.data);
    }

    // List sites with filters
    const filters = {
      witelId: searchParams.get("witelId") || undefined,
      datelId: searchParams.get("datelId") || undefined,
      status:
        (searchParams.get("status") as "Active" | "Inactive") || undefined,
      search: searchParams.get("search") || undefined,
    };

    const result = await listSites(filters);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/site - Create new site
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await createSite(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/site - Update existing site
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Site ID is required" },
        { status: 400 }
      );
    }

    const result = await updateSite(id, data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: result.message.includes("not found") ? 404 : 400 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/site - Delete site
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Site ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteSite(id);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
