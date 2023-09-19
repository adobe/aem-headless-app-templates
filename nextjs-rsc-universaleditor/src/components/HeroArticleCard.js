import Link from 'next/link'
import Image from 'next/image';

export default function HeroArticleCard(props) {
    // image on the left (two thirds of the width) and text on the right (one third of the width)
    return (
        <div className="max-w-[1154px] mx-auto grid grid-cols-1 mt-6 lg:grid-cols-3">
            <div className="col-span-2">
                <Image
                    // width="1313" height="739"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto lg:w-auto lg:h-full"
                    src={props.article.imageUrl}
                    alt={props.article.title}/>
            </div>
            <div className="col-span-1 bg-gray-200 dark:bg-gray-600 p-6">
                <h1>Featured Article</h1>
                <h2>{props.article.title}</h2>
                <p>{props.article.description}</p>
                <div className="pt-10 pb-10">
                    <Link href={props.article.href} className="ml-0 p-5 btn-yellow">
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    )
}
