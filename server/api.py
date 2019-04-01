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

users = {
    "eirik.rye@gmail.com": {
        "id": 1,
        "username": "eirik.rye@gmail.com",
        "password": "eirik123",
        "admin": True,
        "profile": {"fullName": "Eirik Rye", "favouriteAnimal": "Bird"},
    },
    "henrik.gabrielsen@gmail.com": {
        "id": 2,
        "username": "henrik.gabrielsen@gmail.com",
        "password": "gabbeh2102",
        "admin": False,
        "profile": {"fullName": "Henrik Gabrielsen", "favouriteAnimal": "Sloth"},
    },
    "ola.nordmann@gmail.com": {
        "id": 3,
        "username": "ola.nordmann@gmail.com",
        "password": "ola01",
        "admin": False,
        "profile": {"fullName": "Ola Nordmann", "favouriteAnimal": "Cat"},
    },
}

# Used to store a mapping between API tokens and usernames
tokens: Dict[str, str] = {}


def authenticate(req: Request, resp: Response, resource, params):
    if not req.auth:
        raise falcon.HTTPUnauthorized("Please provide token.")

    _type, token = req.auth.split(" ")
    if token not in tokens:
        raise falcon.HTTPUnauthorized("Invalid token.")

    username = tokens[token]
    req.context["user"] = users[username]


class LoginResource:
    def on_post(self, req: Request, resp: Response):
        data: dict = json.load(req.stream)
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
    def on_get(self, req: Request, resp: Response):
        user = req.context["user"]
        resp.media = {
            "username": user["username"],
            "admin": user["admin"],
            "profile": user["profile"],
        }

    def on_patch(self, req: Request, resp: Response):
        user = req.context["user"]
        data: dict = json.load(req.stream)

        user.update(data)

        resp.media = {
            "username": user["username"],
            "admin": user["admin"],
            "profile": user["profile"],
        }


@falcon.before(authenticate)
class UsersResource:
    def on_get(self, req: Request, resp: Response):
        resp.media = [
            {
                "username": user["username"],
                "admin": user["admin"],
                "profile": user["profile"],
            }
            for user in users.values()
        ]


class RandomSleepMiddleware:
    def process_response(self, req: Request, resp, resource, req_succeeded):
        """Uncomment this to have requests randomly sleep, in order to
        see all the cool loading animations in the web interface."""

        # time.sleep(random.random() * 4)


class LoggerMiddleware:
    def process_response(self, req: Request, resp, resource, req_succeeded):
        logger.info("[%s] [%s] %s", req.method, req.relative_uri, str(resp.status))


app = falcon.API(middleware=[LoggerMiddleware(), RandomSleepMiddleware()])
app.add_route("/login", LoginResource())
app.add_route("/me", ProfileResource())
app.add_route("/users", UsersResource())
