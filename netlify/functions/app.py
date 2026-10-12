import os
import sys
import io
import urllib.parse
import base64

# Add repository root to Python path so app and engines can be imported cleanly
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

# Set serverless environment flag
os.environ['NETLIFY'] = 'true'

from app import app

# Check if serverless_wsgi package is available, otherwise use pure-Python WSGI bridge
try:
    import serverless_wsgi  # type: ignore
    def handler(event, context):
        return serverless_wsgi.handle_request(app, event, context)
except ImportError:
    def handler(event, context):
        http_method = event.get('httpMethod', 'GET')
        path = event.get('path', '/')
        
        # Netlify function path stripping (e.g. /.netlify/functions/app/...)
        if path.startswith('/.netlify/functions/app'):
            path = path[len('/.netlify/functions/app'):] or '/'

        query_params = event.get('queryStringParameters') or {}
        query_string = urllib.parse.urlencode(query_params) if query_params else ''

        headers = event.get('headers') or {}
        body = event.get('body') or ''
        is_b64 = event.get('isBase64Encoded', False)

        if is_b64 and body:
            body_bytes = base64.b64decode(body)
        elif isinstance(body, str):
            body_bytes = body.encode('utf-8')
        else:
            body_bytes = b''

        environ = {
            'REQUEST_METHOD': http_method,
            'SCRIPT_NAME': '',
            'PATH_INFO': urllib.parse.unquote(path),
            'QUERY_STRING': query_string,
            'SERVER_NAME': headers.get('host', 'localhost').split(':')[0],
            'SERVER_PORT': headers.get('x-forwarded-port', '443'),
            'SERVER_PROTOCOL': 'HTTP/1.1',
            'wsgi.version': (1, 0),
            'wsgi.url_scheme': headers.get('x-forwarded-proto', 'https'),
            'wsgi.input': io.BytesIO(body_bytes),
            'wsgi.errors': sys.stderr,
            'wsgi.multithread': False,
            'wsgi.multiprocess': False,
            'wsgi.run_once': False,
            'CONTENT_LENGTH': str(len(body_bytes)),
        }

        # Add HTTP headers
        for key, val in headers.items():
            norm_key = key.upper().replace('-', '_')
            if norm_key in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
                environ[norm_key] = val
            else:
                environ[f'HTTP_{norm_key}'] = val

        response_status = ['200 OK']
        response_headers = []

        def start_response(status, headers_list, exc_info=None):
            response_status[0] = status
            response_headers.extend(headers_list)
            return lambda _: None

        result = app(environ, start_response)
        
        response_body = b''.join(result)
        status_code = int(response_status[0].split()[0])

        out_headers = {}
        for k, v in response_headers:
            out_headers[k] = v

        # Determine if response is text or binary
        content_type = out_headers.get('Content-Type', '')
        is_binary = not any(t in content_type for t in ('text', 'json', 'javascript', 'xml', 'html'))

        if is_binary:
            out_body = base64.b64encode(response_body).decode('utf-8')
            out_b64 = True
        else:
            try:
                out_body = response_body.decode('utf-8')
                out_b64 = False
            except UnicodeDecodeError:
                out_body = base64.b64encode(response_body).decode('utf-8')
                out_b64 = True

        return {
            'statusCode': status_code,
            'headers': out_headers,
            'body': out_body,
            'isBase64Encoded': out_b64
        }
