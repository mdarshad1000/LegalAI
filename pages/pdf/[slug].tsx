import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
    ssr: false
});

export default function Pdf() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <PDFViewer />
    );
}