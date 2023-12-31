// server/api/scrape.js
import puppeteer from "puppeteer"
import { eventHandler } from "h3"

export default eventHandler(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    // Navigate to Google
    await page.goto("https://google.com")

    // Get the title of the page
    const title = await page.title()

    // Close the browser
    await browser.close()

    // Return the title as JSON response
    return { title }
  } catch (error) {
    console.error("Error scraping:", error)
    throw new Error("An error occurred while scraping.")
  }
})
