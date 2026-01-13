import { NextRequest, NextResponse } from "next/server";
import {
  listWitels,
  getWitel,
  createWitel,
  updateWitel,
  deleteWitel,
} from "@/server/site";

// GET /api/site/witel - List all witels or get single witel
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const witelId = searchParams.get("id");

    if (witelId) {
      const result = await getWitel(witelId);
      if (!result.success) {
        return NextResponse.json({ error: result.message }, { status: 404 });
      }
      return NextResponse.json(result.data);
    }

    const result = await listWitels();

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

// POST /api/site/witel - Create new witel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await createWitel(body);

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

// PUT /api/site/witel - Update existing witel
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Witel ID is required" },
        { status: 400 }
      );
    }

    const result = await updateWitel(id, data);

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

// DELETE /api/site/witel - Delete witel
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Witel ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteWitel(id);

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
