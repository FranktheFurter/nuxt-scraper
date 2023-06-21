import puppeteer from "puppeteer"
import { eventHandler } from "h3"

export default eventHandler(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto("https://github.com/FranktheFurter?tab=repositories")

    const repositoriesList = await page.$$eval(
      "#user-repositories-list > ul > li",
      (listItems) => {
        return listItems.map((li) => {
          const titleElement = li.querySelector(
            'a[itemprop="name codeRepository"]'
          )
          const title = titleElement ? titleElement.innerText.trim() : null
          const link = titleElement
            ? `https://github.com${titleElement.getAttribute("href")}`
            : null

          const descriptionElement = li.querySelector(
            '[itemprop="description"]'
          )
          const description = descriptionElement
            ? descriptionElement.innerText.trim()
            : null

          const languageElement = li.querySelector(
            '[itemprop="programmingLanguage"]'
          )
          const language = languageElement
            ? languageElement.innerText.trim()
            : null

          const updateTimeElement = li.querySelector("relative-time")
          const updateTime = updateTimeElement
            ? updateTimeElement.getAttribute("datetime")
            : null

          return { title, link, description, language, updateTime }
        })
      }
    )

    await browser.close()

    return { repositoriesList }
  } catch (error) {
    console.error("Error scraping:", error)
    throw new Error("An error occurred while scraping.")
  }
})
