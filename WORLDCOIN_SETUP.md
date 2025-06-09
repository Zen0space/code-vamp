# Worldcoin OAuth Setup Guide

## 🔧 Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Worldcoin OAuth Configuration
WLD_CLIENT_ID=your-worldcoin-client-id
WLD_CLIENT_SECRET=your-worldcoin-client-secret
```

## 🌍 Worldcoin Developer Dashboard Setup

1. **Go to Worldcoin Developer Dashboard**: https://developer.worldcoin.org/
2. **Create a new app** for your mini app
3. **Configure OAuth Settings**:

### Callback URLs

For **NextAuth.js**, configure these callback URLs in your Worldcoin app:

#### Development:
```
http://localhost:3000/api/auth/callback/worldcoin
```

#### Production:
```
https://yourdomain.com/api/auth/callback/worldcoin
```

#### For Mini App (World App):
```
worldapp://mini-app?app_id=[your-app-id]&path=/auth/callback
```

## 🔐 Security Notes

1. **NEXTAUTH_SECRET**: Generate a secure random string for production
2. **Client Credentials**: Keep your `WLD_CLIENT_SECRET` secure and never expose it in client-side code
3. **HTTPS Required**: Production apps must use HTTPS for OAuth callbacks

## 📱 Mini App Integration

For World Coin mini app integration, you'll also need:

1. **MiniKit SDK**: `npm install @worldcoin/minikit-js`
2. **App ID**: From your Worldcoin Developer Dashboard
3. **Proper URL Scheme**: Configure `worldapp://` scheme for deep linking

## 🚀 Next Steps

1. Set up your environment variables
2. Configure callback URLs in Worldcoin Developer Dashboard
3. Test authentication flow
4. Deploy with proper HTTPS URLs for production

## 📚 References

- [Worldcoin NextAuth Template](https://github.com/worldcoin/world-id-nextauth-template)
- [World ID Documentation](https://docs.world.org/)
- [NextAuth.js Documentation](https://next-auth.js.org/) 