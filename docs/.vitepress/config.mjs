const base = "/grok-cli-sandbox/";
const ogImage = "https://sunwood-ai-labs.github.io/grok-cli-sandbox/grok-sandbox-social.png";

export default {
  title: "Grok Sandbox",
  description: "Public sandbox wrapper around a pinned Grok CLI snapshot, with bilingual docs and Telegram helper notes.",
  base,
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: `${base}favicon.svg` }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Grok Sandbox" }],
    ["meta", { property: "og:description", content: "Verified Grok CLI sandbox notes, helper docs, and a pinned submodule snapshot." }],
    ["meta", { property: "og:image", content: ogImage }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: ogImage }]
  ],
  themeConfig: {
    logo: "/grok-sandbox-mark.svg",
    siteTitle: "Grok Sandbox",
    socialLinks: [
      { icon: "github", link: "https://github.com/Sunwood-ai-labs/grok-cli-sandbox" }
    ],
    footer: {
      message: "MIT licensed wrapper scripts and documentation.",
      copyright: "Copyright © 2026 Sunwood-ai-labs"
    },
    search: {
      provider: "local"
    }
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      link: "/",
      themeConfig: {
        nav: [
          { text: "Docs Home", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Verification", link: "/verification-summary" },
          { text: "Japanese", link: "/ja/" }
        ],
        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Getting Started", link: "/getting-started" },
              { text: "Repository Layout", link: "/repo-structure" },
              { text: "Verification Summary", link: "/verification-summary" },
              { text: "Telegram Helper", link: "/telegram-helper" },
              { text: "Troubleshooting", link: "/troubleshooting" },
              { text: "Evidence & Archive", link: "/evidence" }
            ]
          }
        ],
        outline: {
          label: "On this page"
        },
        docFooter: {
          prev: "Previous page",
          next: "Next page"
        }
      }
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      link: "/ja/",
      themeConfig: {
        nav: [
          { text: "ドキュメント", link: "/ja/" },
          { text: "はじめに", link: "/ja/getting-started" },
          { text: "検証結果", link: "/ja/verification-summary" },
          { text: "English", link: "/" }
        ],
        sidebar: [
          {
            text: "ガイド",
            items: [
              { text: "はじめに", link: "/ja/getting-started" },
              { text: "リポジトリ構成", link: "/ja/repo-structure" },
              { text: "検証サマリー", link: "/ja/verification-summary" },
              { text: "Telegram Helper", link: "/ja/telegram-helper" },
              { text: "トラブルシュート", link: "/ja/troubleshooting" },
              { text: "証跡とアーカイブ", link: "/ja/evidence" }
            ]
          }
        ],
        outline: {
          label: "このページ"
        },
        docFooter: {
          prev: "前のページ",
          next: "次のページ"
        }
      }
    }
  }
};
