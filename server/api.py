import json
import logging
import random
import time
import uuid

from typing import Dict

import falcon
from falcon.request import Request
from falcon.response import Response

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

# If RandomSleepMiddleware is active, for each request sleep for this
# amount of seconds to emulate a slow connection, allowing time to see
# spinners, loaders and transitions.
#
# Set to 0 to disable sleep
RANDOM_SLEEP_TIME = 0

# Ad hoc dict to hold users with plaintext passwords
users = {
    "rye@trojka.no": {
        "password": "eirik123",
        "admin": True,
        "profile": {"fullName": "Eirik Rye", "favouriteAnimal": "Bird"},
    },
    "walking.the.planck@example.com": {
        "password": "quanta01",
        "admin": False,
        "profile": {"fullName": "Max Planck", "favouriteAnimal": "Sloth"},
    },
    "stargazer1750@example.com": {
        "password": "dirty-telescope-pole",
        "admin": False,
        "profile": {"fullName": "Caroline Herschel", "favouriteAnimal": "Cat"},
    },
}

# Enumerate the users and add an ID and username:
for user_id, (username, user) in enumerate(users.items()):
    user.update({"username": username, "id": user_id})

# Used to store a mapping between API tokens and usernames
tokens: Dict[str, str] = {}


def user_to_dict(user: dict) -> dict:
    """Turn a user dict into a representation suitable for output.

    That is, a representation that does not expose the user's password.
    """
    return dict(
        id=user["id"],
        username=user["username"],
        admin=user["admin"],
        profile=user["profile"],
    )


def authenticate(req: Request, resp: Response, resource, params):
    """Falcon hook to ensure a request is authenticated.
    
    If successful, a user object is made available to the
    request context.
    """
    if not req.auth:
        raise falcon.HTTPUnauthorized("Please provide token.")

    _type, token = req.auth.split(" ")
    if token not in tokens:
        raise falcon.HTTPUnauthorized("Invalid token.")

    username = tokens[token]
    req.context["user"] = users[username]


class LoginResource:
    """Resource to authenticate and return API token."""

    def on_post(self, req: Request, resp: Response):
        try:
            data = json.load(req.stream)
        except json.JSONDecodeError:
            raise falcon.HTTPBadRequest("Invalid JSON.")

        username = data.get("username", "").lower()
        password = data.get("password")

        if not username or not password:
            raise falcon.HTTPBadRequest("Missing username or password.")

        if username not in users or password != users[username]["password"]:
            raise falcon.HTTPUnauthorized("Login failed.")

        token = str(uuid.uuid4())
        tokens[token] = username

        logger.info("Token %s has been issued for %s.", token, username)

        resp.media = {"token": token}


@falcon.before(authenticate)
class ProfileResource:
    """Resource to view and update user profile."""

    def on_get(self, req: Request, resp: Response):
        user = req.context["user"]
        resp.media = user_to_dict(user)

    def on_patch(self, req: Request, resp: Response):
        try:
            data = json.load(req.stream)
        except json.JSONDecodeError:
            raise falcon.HTTPBadRequest("Invalid JSON.")

        if "profile" not in data:
            raise falcon.HTTPBadRequest("Expected 'profile' in request.")

        user = req.context["user"]
        user["profile"].update(data["profile"])

        resp.media = user_to_dict(user)


@falcon.before(authenticate)
class UsersResource:
    """Resource to list users."""

    def on_get(self, req: Request, resp: Response):
        resp.media = [user_to_dict(user) for user in users.values()]


class RandomSleepMiddleware:
    def process_response(self, req: Request, resp, resource, req_succeeded):
        time.sleep(random.random() * RANDOM_SLEEP_TIME)


class LoggerMiddleware:
    def process_response(self, req: Request, resp, resource, req_succeeded):
        logger.info("[%s] [%s] %s", req.method, req.relative_uri, str(resp.status))


app = falcon.API(middleware=[LoggerMiddleware(), RandomSleepMiddleware()])

app.add_route("/login", LoginResource())
app.add_route("/me", ProfileResource())
app.add_route("/users", UsersResource())
