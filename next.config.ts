import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import hash from 'string-hash';

const configFnc = (phase: string) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    IS_PROD: isProd.toString(),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    VERSION: require('./package.json').version,
  };

  const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: false,
    output: 'standalone',
    // images: {
    //   unoptimized: true,
    // },
    env,
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg')
      );

      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: [
            (context) => {
              return {
                loader: '@svgr/webpack',
                options: {
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            // cleanupIds: false,
                            removeViewBox: false,
                          },
                        },
                      },
                      {
                        name: 'prefixIds',
                        params: {
                          prefix: `svg-${hash(context.resource)}-${hash(
                            context.resourceQuery
                          )}`,
                        },
                      },
                    ],
                  },
                },
              };
            },
          ],
        }
      );

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;

      return config;
    },
  };
  return nextConfig;
};

export default configFnc;

