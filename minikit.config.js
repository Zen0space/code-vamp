/** @type {import('@worldcoin/minikit-js').MiniKitConfig} */
module.exports = {
  app_id: process.env.NEXT_PUBLIC_MINIKIT_APP_ID || 'app_812ac0842eb746d6a8bbe07db8b7cc1e',
  name: 'CodeVamp',
  description: 'Master programming with the hunger of a vampire',
  logo_url: 'https://codevamp.zen0.space/logo.png', // Add your logo URL
  home_url: 'https://codevamp.zen0.space',
  permissions: [
    'read_user_id',
    'read_user_profile'
  ],
  supported_countries: ['MY', 'SG', 'ID', 'GB', 'US', 'AU'], // Malaysia, Singapore, Indonesia, UK, US, Australia
  supported_languages: ['en'],
  category: 'education', // or 'productivity', 'entertainment', etc.
}; 