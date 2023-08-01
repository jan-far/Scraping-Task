import puppeteer from "puppeteer";

const MAX_ITEMS = 500;

export interface IData {
  title: string;
  imageUrl: string[];
}

const scrapeSReality = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });
  const page = await browser.newPage();
  const root = "https://www.sreality.cz/en/";

  const data: IData[] = [];

  for (let currentPage = 1; data.length < MAX_ITEMS; currentPage++) {
    const url = root + "search/for-sale/apartments/?page=" + currentPage;

    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

    const currentPageData = await page.evaluate(() => {
      const items: { title: string; imageUrl: string[] }[] = [];

      const itemElements = document.querySelectorAll(
        ".property"
      ) as unknown as Element[];

      for (const item of itemElements) {
        const titleElement = item.querySelector(".name");
        const imageElement = item.querySelectorAll(
          "a > img"
        ) as unknown as Element[];

        if (titleElement && imageElement) {
          const title = titleElement?.textContent?.trim();
          const imageUrl: string[] = [];

          for (const imgUrl of imageElement) {
            imageUrl.push(imgUrl.getAttribute("src") as string);
          }

          if (title && imageUrl) {
            items.push({ title, imageUrl });
          }
        }
      }

      return items;
    });

    data.push(...currentPageData);

    if (data.length >= MAX_ITEMS) {
      break;
    }
  }

  await browser.close();
  return data.slice(0, MAX_ITEMS);
};

export default scrapeSReality;
