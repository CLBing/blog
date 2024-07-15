import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  /**
   *  必填字段
   *  title： 网站标题
   *  url：网站 URL
   *  baseUrl：基本URL
   */
  title: "71的日常",
  url: "https://blog-phi-six-23.vercel.app/",
  baseUrl: "/",

  /**
   * favicon：网站图标
   */
  favicon: "img/favicon.ico",

  organizationName: "K71",
  projectName: "blog",

  /**
   * 'ignore' | 'log' | 'warn' | 'throw'
   * onBrokenLinks：检测到损坏链接时行为
   * onBrokenMarkdownLinks：检测到损坏 markdown 时行为
   */
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  /**
   * i18 国际化
   */
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
            // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

    /**
   * 主题配置
   */
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    /**
     * 导航栏
     */
    navbar: {
      title: "My Site",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "right",
          label: "Docs",
        },
        { to: "/blog", label: "Blog", position: "right" },
      ],
    },
    /**
     * 页脚
     */
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/introduction",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "bilibili",
              href: "https://space.bilibili.com/34572629",
            },
          ],
        },
        {
          title: "More",
          items: [

          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
