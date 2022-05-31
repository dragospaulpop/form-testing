const puppeteer = require('puppeteer'); // v13.0.0 or later

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(element, timeout) {
      await waitForConnected(element, timeout);
      const isInViewport = await element.isIntersectingViewport({threshold: 0});
      if (isInViewport) {
        return;
      }
      await element.evaluate(element => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'auto',
        });
      });
      await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
    // actual recorded steps
    {
        const targetPage = page;
        await targetPage.setViewport({"width":1167,"height":980});
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto("http://127.0.0.1:5500/index.html?");
        await Promise.all(promises);
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Name:"],["#text > input[type=text]"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({ offset: { x: 147.5, y: 15.40625 } });
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Name:"],["#text > input[type=text]"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.type("an");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Tab");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Tab");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors(["#email > input[type=email]"], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.type("good@email.com");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Tab");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Tab");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors(["#tel > input[type=tel]"], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.type("0712345678");
        await targetPage.waitForTimeout(1000)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors(["body > form > fieldset > div > button"], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({ offset: { x: 50.5, y: 20.40625 } });
        await targetPage.waitForTimeout(1000)
    }
    {
      const targetPage = page;
      const element = await waitForSelectors(["#text > p"], targetPage, { timeout, visible: true });
      await scrollIntoViewIfNeeded(element, timeout);
      const value = await element.evaluate(el => el.textContent);

      if (value === 'name must be greater than 2 chars ') {
        page.screenshot({
          path: './passed/form-test-short-name.png',
          type: 'png'
        })
      } else {
        page.screenshot({
          path: './failed/form-test-short-name.png',
          type: 'png'
        })
      }
    }

    await page.waitForTimeout(5000)
    await browser.close();
})();
