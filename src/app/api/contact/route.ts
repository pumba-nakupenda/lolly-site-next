import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(req: NextRequest) {
    if (!WEBHOOK_URL) {
        return NextResponse.json({ error: "Contact service unavailable" }, { status: 503 });
    }

    const body = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...body,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`Webhook responded with ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact webhook error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
