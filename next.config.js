module.exports = {
  async redirects() {
    return [
      {
        source: '/:slug',
        has: [
          {
            type: 'header',
            key: 'referer',
            value: 'https://*.facebook.com/',
          },
        ],
        permanent: true,
        destination: 'https://medsvit.org/:slug',
      },
    ];
  },
}
