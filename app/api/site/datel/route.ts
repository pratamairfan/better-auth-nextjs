import { NextRequest, NextResponse } from "next/server";
import {
  listDatels,
  getDatel,
  createDatel,
  updateDatel,
  deleteDatel,
} from "@/server/site";

// GET /api/site/datel - List all datels or get single datel
// Query params: id, witelId (for filtering)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const datelId = searchParams.get("id");
    const witelId = searchParams.get("witelId");

    if (datelId) {
      const result = await getDatel(datelId);
      if (!result.success) {
        return NextResponse.json({ error: result.message }, { status: 404 });
      }
      return NextResponse.json(result.data);
    }

    const result = await listDatels(witelId || undefined);

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

// POST /api/site/datel - Create new datel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await createDatel(body);

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

// PUT /api/site/datel - Update existing datel
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Datel ID is required" },
        { status: 400 }
      );
    }

    const result = await updateDatel(id, data);

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

// DELETE /api/site/datel - Delete datel
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Datel ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteDatel(id);

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
