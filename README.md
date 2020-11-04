# Valutor

## Basic info

Currency (English) = Valuta (Swedish)  
Currency (English) = Valuta (Croatian)

But since we're dealing with multiple currencies here, let's go with the Swedish plural for the name. :)

---

This is my solution for the programming assignment for joining Anyfin.

---

## Features

### Currency conversion

Assignment requirement:

> Search for countries and display at least full country name, capital, population and currency

Every pinned currency when tapped shows information from its country in a popup

### Country Information

Assignment requirement:

> Enter an amount in SEK and get the amount converted into the local currency for each of these countries

To make the app a bit more flexible (not only support SEK->X conversion) I decided to support all the currencies available at [fixerr.io](https://fixerr.io) and allow conversion from and to them.

## Other features

- Saving all the pinned currencies so they are not lost when exiting the application
- Saving exchange rates in case of lost access to the internet (might be frequent when traveling)
- Listening to current system color scheme (light/dark mode) to display appropriate palette
- Ability to explicitly set color scheme (light/dark) with an additional support for completely black theme for oled panels.

### Other minor features:

- Search bar will debounce input - implemented a `useDebounce` hook
- The search will currently first search currency codes (SEK, EUR, USD, etc.) and if none found fall back to searching by name

---

## Wish List

I spent around 12 hours on the application in total. I wanted to make it as close to "production-ready" in that short time. However, there are still a few things I'd want to do/want to fix:

- Search results being both for currency code search and country name search
- Currently, it's not possible to add more than one country with the same currency (e.g. Finland[EUR] and Spain [EUR]). At least some sort of feedback would be nice here.
- Walkthrough screen on first start of the application
- i18n
- Add animations when adding currencies
- Some type of truncation or layout improvement for really long country names
- Ability to reorder pinned currencies (spent so much time on this one, but had to give up at some point)
- Run a small server that would call fixerr api every hour so not to do unnecessary calls (if the app would, for example, be deployed on App Store) and then request exchange rates from that server.
- Do the whole thing using TypeScript (didn't do it as writing js allows me to quickly write more)

## Run locally

Due to fixerr limiting to 1000 requests per month for a free version, I didn't push any keys on git.

- Register for free [here](https://fixerr.io).
- Add the key inside `src/keys/index.js` like this:
  ```
  export const FIXER_ACCESS = 'your-access-token';
  ```
- Run app normally
