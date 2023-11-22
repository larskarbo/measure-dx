import puppeteer from "puppeteer";
import chalk from "chalk";

const pathsToTest = ["/", "/quests/brave", "/dev.larskarbo.eth"];

const BASE_URL = "http://127.0.0.1:3000";

// const pathsToTest = ["/", "/app", "/user/larskarbo"];

// const BASE_URL = "http://localhost:3010/";

const go = async () => {
  const testFetch = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://dev.larskarbo.eth",
  ];

  for (let url of testFetch) {
    try {
      let response = await fetch(url);
      console.log(
        `Status of ${url}: ${
          response.ok ? chalk.green("Working") : chalk.red("Not Working")
        }`
      );
    } catch (error) {
      console.log(chalk.red(`Error fetching ${url}: ${error}`));
    }
  }

  const browser = await puppeteer.launch({
    headless: "new",
  });

  for (let path of pathsToTest) {
    const page = await browser.newPage();

    // Start the timer before navigation
    const start = Date.now();

    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle0" });

    // Stop the timer after navigation is complete
    const timeElapsed = Date.now() - start;

    const LogColor = timeElapsed > 2000 ? "red" : "green";

    console.log(chalk[LogColor](`Time elapsed for ${path} : ${timeElapsed}ms`));

    await page.close();
  }

  await browser.close();
};

// Call the function
go().catch((error) => console.log(chalk.red(`Error: ${error}`)));
