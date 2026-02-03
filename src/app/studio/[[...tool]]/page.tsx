import { Metadata, Viewport } from "next";
import Studio from "./Studio";

export const metadata: Metadata = {
    title: "Sanity Studio",
    robots: {
        index: false,
        follow: false,
    },
};

export const viewport: Viewport = {
    maximumScale: 1,
};

export const dynamic = "force-static";

export default function StudioPage() {
    return <Studio />;
}
