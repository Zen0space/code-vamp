const { parse } = require('url');
const { parse: parseQuery } = require('querystring');

// NextAuth configuration
const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel: profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
};

// Simple session store (in production, use a database)
const sessions = new Map();

// Helper function to generate a simple JWT-like token
function generateToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = require('crypto')
    .createHmac('sha256', authConfig.secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Helper function to verify and decode token
function verifyToken(token) {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = require('crypto')
      .createHmac('sha256', authConfig.secret)
      .update(`${header}.${payload}`)
      .digest('base64url');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch (error) {
    return null;
  }
}

// Main handler function
exports.handler = async (event, context) => {
  const { httpMethod, path, headers, body, queryStringParameters } = event;
  const { pathname } = parse(event.path);
  
  // Extract the NextAuth route from the path
  const authPath = pathname.replace('/api/auth/', '').replace('/.netlify/functions/nextauth/', '');
  const [action, ...params] = authPath.split('/');

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.NEXTAUTH_URL || 'https://codevamp.zen0.space',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    switch (action) {
      case 'session':
        return handleSession(event, corsHeaders);
      
      case 'providers':
        return handleProviders(corsHeaders);
      
      case 'signin':
        return handleSignIn(event, corsHeaders, params);
      
      case 'signout':
        return handleSignOut(event, corsHeaders);
      
      case 'callback':
        return handleCallback(event, corsHeaders, params);
      
      case '_log':
        return handleLog(event, corsHeaders);
      
      default:
        return {
          statusCode: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Not found' }),
        };
    }
  } catch (error) {
    console.error('NextAuth function error:', error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

// Handle session requests
function handleSession(event, corsHeaders) {
  const cookies = parseCookies(event.headers.cookie || '');
  const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];
  
  if (!sessionToken) {
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    };
  }
  
  const session = verifyToken(sessionToken);
  if (!session) {
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    };
  }
  
  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: session.user,
      expires: session.expires,
    }),
  };
}

// Handle providers requests
function handleProviders(corsHeaders) {
  const providers = {};
  
  authConfig.providers.forEach(provider => {
    providers[provider.id] = {
      id: provider.id,
      name: provider.name,
      type: provider.type,
      signinUrl: `/api/auth/signin/${provider.id}`,
      callbackUrl: `/api/auth/callback/${provider.id}`,
    };
  });
  
  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(providers),
  };
}

// Handle sign in requests
function handleSignIn(event, corsHeaders, params) {
  const [providerId] = params;
  
  if (!providerId) {
    // Return sign in page or redirect
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      body: `
        <html>
          <body>
            <h1>Sign In</h1>
            <a href="/api/auth/signin/worldcoin">Sign in with Worldcoin</a>
          </body>
        </html>
      `,
    };
  }
  
  const provider = authConfig.providers.find(p => p.id === providerId);
  if (!provider) {
    return {
      statusCode: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Provider not found' }),
    };
  }
  
  // Generate state and redirect to OAuth provider
  const state = require('crypto').randomBytes(32).toString('hex');
  const redirectUrl = `${provider.wellKnown.replace('/.well-known/openid-configuration', '')}/oauth/authorize?client_id=${provider.clientId}&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + '/api/auth/callback/' + providerId)}&response_type=code&scope=${encodeURIComponent(provider.authorization.params.scope)}&state=${state}`;
  
  return {
    statusCode: 302,
    headers: {
      ...corsHeaders,
      'Location': redirectUrl,
      'Set-Cookie': `next-auth.state=${state}; Path=/; HttpOnly; SameSite=Lax`,
    },
    body: '',
  };
}

// Handle sign out requests
function handleSignOut(event, corsHeaders) {
  return {
    statusCode: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Set-Cookie': [
        'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax',
        '__Secure-next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax; Secure',
      ],
    },
    body: JSON.stringify({ url: process.env.NEXTAUTH_URL }),
  };
}

// Handle OAuth callback
async function handleCallback(event, corsHeaders, params) {
  const [providerId] = params;
  const { code, state } = event.queryStringParameters || {};
  
  if (!code || !providerId) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing code or provider' }),
    };
  }
  
  // In a real implementation, you would:
  // 1. Verify the state parameter
  // 2. Exchange the code for tokens
  // 3. Fetch user profile
  // 4. Create session
  
  // For now, create a mock session
  const user = {
    id: 'mock-user-id',
    name: 'Mock User',
    verificationLevel: 'orb',
  };
  
  const sessionData = {
    user,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    userRole: 'admin',
  };
  
  const sessionToken = generateToken(sessionData);
  
  return {
    statusCode: 302,
    headers: {
      ...corsHeaders,
      'Location': process.env.NEXTAUTH_URL || 'https://codevamp.zen0.space',
      'Set-Cookie': `next-auth.session-token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
    },
    body: '',
  };
}

// Handle log requests (for debugging)
function handleLog(event, corsHeaders) {
  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true }),
  };
}

// Helper function to parse cookies
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
  }
  return cookies;
} 