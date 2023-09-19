import Image from 'next/image'

import React from 'react';
import Accordion from "@/components/Accordion";

const items = [
    {
        title: "Who is WKND's intended audience?",
        content: "We believe the best adventures and activities are those that are accessible to everyone. WKND is designed to be inclusive of all age ranges, abilities, and budget-levels. We strive to cater to the thrill-seeking adrenaline junkie BASE-jumpers as well as novices that have a spare weekend and interest in trying something new."
    },
    {
        title: "How does WKND pay for itself?",
        content: "WKND charges a small fee for local promoters that want to sponsor their adventures and events on the WKND site.  Sponsored Adventures may get sorted to more prominent positions in our Adventures listings pages."
    },
    {
        title: "Can I contribute to WKND?",
        content: "Yes!  If you have the expertise and experiences to share, we’ll provide the platform to spread it.  As a Guest Writer, you will play an integral role in helping people find fun and cool things to do in your community."
    },
    {
        title: "How often is WKDN updated?",
        content: "WKND is updated daily to provide you with the latest in-depth articles on fun activities that we’ve recently exploring and new adventures that are available for you to discover.  Come back often to see the latest or subscribe to our social feeds."
    },
    {
        title: "When was WKND founded?",
        content: "WKND was created in 2015 when our founders, Daniel and Kilian, realized that their friends and family were constantly using them as resources to find fun things to do while they were in Los Angeles. They loved sharing ideas about fun events and activities they knew of, but wanted to be able to do it at larger scale across communities.  They decided to start WKND as a way to share their insights and experiences with as many people as possible."
    },
    {
        title: "Is a hot dog a sandwich?",
        content: "While it may be described as meat between two pieces of bread, a hot dog is just a sandwich in the same way Michael Jordan was just a basketball player or William Shakespeare was just a playwright.  Technically true, but vastly understated."
    },
    {
        title: "Is WKND a real company?",
        content: "No. The WKND is a fictional online magazine and adventure company that focuses on outdoor activities and trips across the globe. The WKND site is designed to demonstrate functionality for Adobe Experience Manager. There is also a corresponding tutorial that walks a developer through the development.  Special thanks to Lorenzo Buosi and Kilian Amendola who created the beautiful design for the WKND site."
    }
];


export async function generateStaticParams() {
    return ["en-US"].map((lang) => ({
        lang: lang,
    }))
}

export default async function Page({params: {lang}}) {
    return (
        <main className=" text-lg px-4">
            <div className="max-w-[1154px] mx-auto ">
                <h1 className="w-[84px] border-5 border-b-yellow"><span className="">FAQs</span></h1>
                <div>
                    <Image src="https://wknd.site/us/en/faqs/_jcr_content/root/container/container/image.coreimg.60.1600.jpeg/1660323785307/adobestock-277768563.jpeg"
                           width={708}
                           height={472}
                           alt="A woman facing away from the camera on top of the mountain, with hands extended to the side, looking at the deep valey filled with lakes"
                    />
                </div>
                <div className="mt-10">
                    WKND is a collective of outdoors, music, crafts, adventure sports, and travel enthusiasts that want to
                    share our experiences, connections, and expertise with the world. Our objective is create a community to
                    help like-minded adventure seekers find fun, engaging, and responsible ways to to enjoy life and create
                    lasting memories.
                </div>
                <div className="mt-10">
                    <Accordion items={items}/>
                </div>
            </div>

        </main>
    );
};
