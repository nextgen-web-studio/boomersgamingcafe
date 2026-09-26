const fs = require("fs");

let gamesContent = fs.readFileSync("src/lib/games.ts", "utf8");

const trailers = {
  "marvels-spider-man-2": "https://www.youtube.com/embed/bgqGdIoa52s",
  "god-of-war-ragnarok": "https://www.youtube.com/embed/tQH0YK1rGVc",
  "grand-theft-auto-vi": "https://www.youtube.com/embed/l6RRdTFuepk",
  "ghost-of-yotei": "https://www.youtube.com/embed/d48IWwIRg98",
  "astro-bot": "https://www.youtube.com/embed/unYFdcEjV9k",
  "the-last-of-us-part-i": "https://www.youtube.com/embed/R2Ebc_OFeug",
  "horizon-forbidden-west": "https://www.youtube.com/embed/UxDWGW7Z67I",
  "gran-turismo-7": "https://www.youtube.com/embed/oz-O74SmTSQ",
  "helldivers-2": "https://www.youtube.com/embed/2iZox9M8sWI",
  "death-stranding-2-on-the-beach": "https://www.youtube.com/embed/od0ULrKzylQ",
  "stellar-blade": "https://www.youtube.com/embed/V6XYHiBxkvk",
  "rise-of-the-ronin": "https://www.youtube.com/embed/34FMSgdzzvI",
  "ratchet-and-clank-rift-apart": "https://www.youtube.com/embed/55PRv_e00wc",
  "returnal": "https://www.youtube.com/embed/ZsVRtrRsUBk",
  "demons-souls": "https://www.youtube.com/embed/qjZIw0VUezU",
  "sackboy-a-big-adventure": "https://www.youtube.com/embed/ZOk3fj5ujNM",
  "uncharted-legacy-of-thieves-collection": "https://www.youtube.com/embed/F3Wl-OiZCO4",
  "the-last-of-us-part-ii-remastered": "https://www.youtube.com/embed/-llaUBqovHw",
  "marvels-spider-man-miles-morales": "https://www.youtube.com/embed/RHQe-UsmC_0",
  "horizon-zero-dawn-remastered": "https://www.youtube.com/embed/kMN-x9goE7M",
  "lego-horizon-adventures": "https://www.youtube.com/embed/1vFsP75mS-Y",
  "until-dawn": "https://www.youtube.com/embed/bIkuM5y0Bjw",
  "final-fantasy-vii-rebirth": "https://www.youtube.com/embed/5ZXqcymx0CI",
  "silent-hill-2": "https://www.youtube.com/embed/OWACgbMeg8Q",
  "resident-evil-4-remake": "https://www.youtube.com/embed/bwxMrAy4z-s"
};

for (const [slug, trailer] of Object.entries(trailers)) {
  const regex = new RegExp(`{ slug: "${slug}", (.*?) }`, "g");
  gamesContent = gamesContent.replace(regex, (match, inner) => {
    // Remove any existing trailer
    let newInner = inner.replace(/, trailer: ".*?"/, "");
    // Add new trailer
    return `{ slug: "${slug}", ${newInner}, trailer: "${trailer}" }`;
  });
}

fs.writeFileSync("src/lib/games.ts", gamesContent);
console.log("Done");

