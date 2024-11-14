from fastapi import FastAPI

from app.api import router
from app.core.container import wire
from app.core.middleware import setup_middlewares


wire()

app = FastAPI()

setup_middlewares(app)

app.include_router(router)
