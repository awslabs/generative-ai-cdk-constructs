// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.github;

const projectName = 'generative-ai-cdk-constructs'
const niceProjectName = 'Generative AI CDK Constructs'
const organization = 'awslabs'

const config = {
  title: niceProjectName,
  tagline: 'Everything businesses need to deliver generative AI fueled innovation',
  url: 'https://' + organization + '.github.io',
  baseUrl: '/', //uncomment for local dev
  // baseUrl: '/generative-ai-cdk-constructs/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/header-icon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: organization, // Usually your GitHub org/username.
  projectName: projectName, // Usually your repo name.
  deploymentBranch: 'main',
  githubHost: 'github.com',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/' + organization + '/' + projectName + '/blob/main/website/',
        },
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          readingTime: ({ content, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          editUrl:
            'https://github.com/' + organization + '/' + projectName + '/blob/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
  {
    navbar: {
      title: 'GenAI CDK Constructs',
      logo: {
        alt: niceProjectName + ' Logo',
        src: 'img/header-icon.png',
      },
      items: [
        {
          href: 'https://github.com/' + organization + '/' + projectName,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      }
    },
    footer: {
      style: 'light',
      copyright: `Amazon.com, Inc. or its affiliates. All Rights Reserved`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme
    },
    mermaid: {
      theme: { light: 'forest', dark: 'dark' },
    },
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [require.resolve('docusaurus-lunr-search')],
};

module.exports = config;
