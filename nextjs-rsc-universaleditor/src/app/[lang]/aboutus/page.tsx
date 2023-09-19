import React from "react";
import AvatarCard from "@/components/AvatarCard";

export async function generateStaticParams() {
    return ["en-US"].map((lang) => ({
        lang: lang,
    }))
}

const authors = [
    {
        name: "Stacey Roswells",
        role: "Artist | Photographer | Traveler",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/stacey-roswells/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323785093/stacey-roswells.jpeg"
    },
    {
        name: "Jake Hammer",
        role: "Influencer | Writer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/jake-hammer/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323785595/alex-iby-343837.jpeg"
    },
    {
        name: "Ian Provo",
        role: "Photographer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/ian-provo/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323783653/ian-provo.jpeg"
    },
    {
        name: "Jacob Wester",
        role: "Skater | Writer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/jacob-wester/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323792237/jacob-wester.jpeg"
    },
]

const guides = [
    {
        name: "Sofia Sjöberg",
        role: "Photographer | Youtuber",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/sofia-sjoeberg/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323785351/ayo-ogunseinde-237739.jpeg"
    },
    {
        name: "Justin Barr",
        role: "Artist | Rock Climber",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/justin-barr/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323786548/justin-barr.jpeg"
    },
    {
        name: "Kumar Selveraj",
        role: "Photographer | Surfer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/kumar-selveraj/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323783843/kumar-selvaraj.jpeg"
    },
]

export default function AboutUs() {
    return (
        <main className=" text-lg px-4">
            <div className="max-w-[1154px] mx-auto space-y-8">
                <h1 className="border-5 border-b-yellow">About Us</h1>
                We are a group of passionate travelers who love to share our experiences with others. We believe that a
                vacation should be more than just a trip, it should be a cultural exchange. We love to learn about the
                people and places we visit, and we want to share that knowledge with you.
                <h2 id="contributors" className="border-5 border-b-yellow">Our Story</h2>
                <div className="italic text-sm">
                    WKND started as a passion project between friends. We wanted to create a place where we could share
                    our travel stories and connect with other like-minded travelers. We started by sharing our own
                    experiences, but we quickly realized that our stories were only a small part of the picture. We
                    wanted to share the stories of others, so we started reaching out to the people we met along the
                    way.
                    We asked them to share their stories with us, and they were happy to oblige. We hope you enjoy
                    reading their stories as much as we enjoyed collecting them.
                </div>

                <h2 className="border-5 border-b-yellow">Our Team</h2>
                <div className="italic text-sm">
                    Meet the team behind WKND. We are a group of passionate travelers who love to share our experiences
                    with others.
                </div>
                <h3 className="border-5 border-b-yellow">Our Contributors</h3>
                <div className="italic text-sm">
                    Meet the outstanding individuals responsible for bringing you the most compelling stories across the
                    globe.
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {authors.map((author, i) => (
                        <AvatarCard
                            key={i}
                            imageUrl={author.imageUrl}
                            name={author.name}
                            role={author.role}
                            social=""/>
                    ))
                    }
                </div>

                <h3 id="guides" className="border-5 border-b-yellow">Our WKND Guides</h3>
                <div className="italic text-sm">
                    Meet our extraordinary travel guides. When you travel with a certified WKND guide you gain access to
                    attractions and perspectives not found on the pages of a guide book.
                </div>

                <div className="grid md:grid-cols-3 gap-4 pb-16">
                    {guides.map((guide, i) => (
                        <AvatarCard
                            key={i}
                            imageUrl={guide.imageUrl}
                            name={guide.name}
                            role={guide.role}
                            social=""/>
                    ))}
                </div>
            </div>
        </main>
    );
};
