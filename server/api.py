import falcon
from falcon.request import Request
from falcon.response import Response
import json
import logging
import uuid
import time
import random

from typing import Dict

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

users = {
    'eirik.rye@gmail.com': {
        'password': 'eirik123',
        'profile': {
            'name': 'Eirik Rye',
            'admin': True,
            'favourite_animal': 'Bird'
        }
    },
    'henrik.gabrielsen@gmail.com': {
        'password': 'gabbeh2102',
        'profile': {
            'name': 'Henrik Gabrielsen',
            'admin': False,
            'favourite_animal': 'Sloth'
        }
    }
}

# Used to store a mapping between API tokens and usernames
tokens = {}

def random_sleep() -> None:
    sleep_time = random.random() * 3
    print("Sleeping for:", sleep_time)
    time.sleep(sleep_time)

def authenticate(req: Request, resp: Response, resource, params):
    if not req.auth:
        raise falcon.HTTPUnauthorized("Please provide token.")

    _type, token = req.auth.split(" ")
    if not token in tokens:
        raise falcon.HTTPUnauthorized("Invalid token.")

    username = tokens[token]
    req.context['user'] = users[username]['profile']

class LoginResource:
    def on_post(self, req: Request, resp: Response):
        random_sleep()
        data: dict = json.load(req.stream)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            raise falcon.HTTPBadRequest('Missing username or password.')
            return

        if username not in users:
            raise falcon.HTTPUnauthorized('No such user.')
            return

        token = str(uuid.uuid4())
        tokens[token] = username

        logger.info("Token %s has been issued for %s.", token, username)

        resp.media = {"token": token}

@falcon.before(authenticate)
class ProfileResource:
    def on_get(self, req: Request, resp: Response):
        random_sleep()
        resp.media = req.context.get('user')

class LoggerMiddleware:
    def process_response(self, req: Request, resp, resource, req_succeeded):
        logger.info('[{0}] [{1}] {2}'.format(req.method, req.relative_uri, str(resp.status)))

app = falcon.API(middleware=[LoggerMiddleware()])
app.add_route('/login', LoginResource())
app.add_route('/me', ProfileResource())
