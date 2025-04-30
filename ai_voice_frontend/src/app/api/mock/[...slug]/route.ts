import { NextRequest } from "next/server";
import { getPresignedUrl } from "~/lib/s3";

const services = {
    "styletts2": {
        voices: ["Elon Musk", "gavin", "vinay"],
    },
    "seed-vc": {
        voices: ["Elon Musk", "Trump"],
    },
    "make-a-sound": {
        voices: [],
    },
};

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string[]; }; },
) {
    const slug = await params.slug;
    const [service, endpoint] = slug;

    if (!services[service as keyof typeof services]) {
        return Response.json({ error: "Service not found" }, { status: 404 });
    }

    if (endpoint === "voices") {
        return Response.json({
            voices: services[service as keyof typeof services].voices,
        });
    }

    if (endpoint === "health") {
        return Response.json({
            status: "healthy",
            model: "loaded",
        });
    }

    return Response.json({ error: "Not found" }, { status: 404 });
}

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string[]; }; },
) {
    const awaitedParams = await params;
    const slug = awaitedParams.slug;
    const [service] = slug;

    if (!services[service as keyof typeof services]) {
        return Response.json({ error: "Service not found" }, { status: 404 });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const s3Key = "styletts2-output/4b479890-916f-414d-9e2a-afc25bfdce73.wav";
    const presignedUrl = await getPresignedUrl({ key: s3Key });

    return Response.json({
        audio_url: presignedUrl,
        s3_key: s3Key,
    });
}