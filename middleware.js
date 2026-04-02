export const config = {
  matcher: '/admin(.*)',
};

export default function middleware(request) {
  const url = new URL(request.url);
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const decodedAuth = atob(authValue);
    const [user, pwd] = decodedAuth.split(':');

    if (user === 'admin' && pwd === 'DetTor2026') {
      // Allow request to continue
      return new Response(null, {
        headers: {
          'x-middleware-next': '1'
        }
      });
    }
  }

  // Return a 401 response and request basic auth
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Administration Area"',
    },
  });
}
