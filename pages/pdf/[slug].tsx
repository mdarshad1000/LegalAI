import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Pdf() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className="h-screen">
            <div className="ring w-1/2 h-full">
                <embed src={`https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2` + slug + '?alt=media'}
                    type="application/pdf" width="100%" height="100%"
                ></embed>
            </div>
        </div>

    );
}