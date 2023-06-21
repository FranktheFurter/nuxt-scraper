const { writeFile } = require("fs/promises")
const { launch } = require("puppeteer")

const scrapGithub = async (page) => {
  await page.goto("https://github.com/FranktheFurter?tab=repositories")

  const repos = await page.$$eval("#user-repositories-list li", (els) => {
    return els.map((el) => {
      return {
        title: el
          .querySelector('[itemprop="name codeRepository"]')
          ?.innerText.trim(),
        link: `https://github.com${el
          .querySelector('[itemprop="name codeRepository"]')
          .getAttribute("href")}`,
        description: el
          .querySelector('[itemprop="description"]')
          ?.innerText.trim(),
        lang: el
          .querySelector('[itemprop="programmingLanguage"]')
          ?.innerText.trim(),
        updated: el.querySelector("relative-time")?.getAttribute("datetime"),
      }
    })
  })

  await writeFile("./public/storage/github.json", JSON.stringify({ repos }))
}

;(async () => {
  const browser = await launch({ headless: "new" })
  const page = await browser.newPage()

  await scrapGithub(page)

  browser.close()
})()
