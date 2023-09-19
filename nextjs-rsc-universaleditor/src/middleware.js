import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {NextResponse} from 'next/server'

let locales = ['en-US', 'nl-NL', 'nl']

// Get the preferred locale, similar to above or using a library
function getLocale(request) {
    let headers = {'accept-language': 'en-US,en;q=0.5'}
    let languages = new Negotiator({headers}).languages()
    let locales = ['en-US', 'nl-NL', 'nl']
    let defaultLocale = 'en-US'

    return match(languages, locales, defaultLocale) // -> 'en-US'
}

export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname
    //skip if is a favicon
    if (pathname === '/favicon.ico') return
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // '/((?!favicon).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}
