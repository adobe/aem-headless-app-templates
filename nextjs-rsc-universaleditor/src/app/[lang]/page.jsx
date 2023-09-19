import Image from "next/image";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import Link from "next/link";
import AdventuresList from "../../components/AdventuresList";
import HeroAdventureCard from "../../components/HeroAdventureCard";
import {getAdventures} from "../../lib/adventures";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';

export async function generateStaticParams() {
    return ["en-US"].map((lang) => ({
        lang: lang,
    }))
}

export default async function Page({params: {lang}}) {

    const adventures = await getAdventures(lang);
    const featuredAdventure = adventures[9];

    return (
        <main className=" px-0 mx-0">
            <div className="">
                <Carousel className="">
                    <CarouselItem>
                        <div className="h-full mx-0 md:relative">
                            <Image className="mx-0 w-full"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                   quality={75}
                                   eager={"true"}
                                   priority={true}
                                   loading={'eager'}
                                   alt={'hero'}
                                   src="https://wknd.site/us/en/adventures/_jcr_content/root/container/teaser.coreimg.60.1600.jpeg/1660323801921/adobestock-216674449.jpeg"
                                   width={1275}
                                   height={650}
                            />
                            <div
                                className="md:absolute md:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 md:p-10 p-2 backdrop-blur-sm">
                                <div className="text-xl md:text-white">WKND Adventures</div>
                                <div className="pt-5 text-base md:text-white">Join us on one of our next adventures. Browse our list
                                    of curated experiences and sign up for one when you&apos;re ready to explore with
                                    us.
                                </div>
                                <div className="pt-10 pb-0">
                                    <Link href="/en-US/adventure-collection/all" prefetch={true} className="p-4 btn-yellow uppercase">
                                        View Trips
                                    </Link></div>
                            </div>

                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="h-full mx-0 md:relative">
                            <Image className="mx-0 w-full"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                   quality={75}
                                   eager={"false"}
                                   priority={false}
                                   alt={'hero'}
                                   src="https://wknd.site/us/en/_jcr_content/root/container/carousel/item_1572035298405.coreimg.60.1600.jpeg/1660323822923/beach-walking.jpeg"
                                   width={1275}
                                   height={650}
                            />
                            <div
                                className="md:absolute md:bottom-0 max-w-[1136px] m-auto left-0 right-0 my-5 md:p-10 p-2 backdrop-blur-sm">
                                <div className="text-xl dark:md:text-black">San Diego Surf Spots</div>
                                <div className="pt-5 text-base dark:md:text-black">From the hippie beaches of Ocean Beach to the ritzy
                                    shores of La Jolla and everywhere in between. Discover the San Diego surf scene.
                                </div>
                                <div className="pt-10 pb-0">
                                    <Link href="/en-US/adventures/riverside-camping-australia/riverside-camping-australia" className="p-4 btn-yellow uppercase">
                                        Full Article
                                    </Link></div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="h-full mx-0 md:relative">
                            <Image className="mx-0 w-full"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                   quality={75}
                                   eager={"false"}
                                   priority={false}
                                   alt={'hero'}
                                   src="https://wknd.site/us/en/adventures/downhill-skiing-wyoming/_jcr_content/root/container/carousel/image.coreimg.60.1600.jpeg/1660323784078/adobestock-185234795.jpeg"
                                   width={1275}
                                   height={650}
                            />
                            <div
                                className="md:absolute md:bottom-0 max-w-[1136px] m-auto left-0 right-0 mh-5 md:p-10 p-2 backdrop-blur-md /80">
                                <div className="text-xl">Downhill Skiing Wyoming</div>
                                <div className="pt-5 text-base">Experience wild untamed, rolling, wide-open terrain of
                                    Wyoming in the winter.
                                </div>
                                <div className="pt-10 pb-0"><Link
                                    href="adventures/downhill-skiing-wyoming/downhill-skiing-wyoming"
                                    className="p-4 btn-yellow uppercase">Full Article</Link></div>
                            </div>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>

            <div className="max-w-[1154px] mx-auto pt-8">
                <h2>Featured Adventure</h2>
                The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.
            </div>

            <HeroAdventureCard adventure={featuredAdventure}/>

            <div className="max-w-[1154px] mx-auto pt-8 px-4">
                <h2>Our Most Popular Adventures</h2>
            </div>

            <AdventuresList lang={lang} collectionSlug={"popular"} showCategoryPicker={false}/>

            <div className="max-w-[1154px] mx-auto py-12">
                <Link href="/en-US/adventure-collection/all" className="ml-5 p-5 btn-yellow">See All adventures</Link>
            </div>

        </main>)
}
