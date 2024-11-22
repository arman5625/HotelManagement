import {createClient } from "next-sanity";

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_STUDIO_TOKEN,
    apiVersion: "2024-11-22"
});

export default sanityClient;