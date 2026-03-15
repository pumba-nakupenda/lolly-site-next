import Breadcrumb from "@/components/Breadcrumb";
import { ReactNode } from "react";

export default function ServicesLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative">
            <Breadcrumb />
            {children}
        </div>
    );
}
