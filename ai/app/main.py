from fastapi import FastAPI

from app.api.v1.routes import setup_routers  # type: ignore
from app.core.config import settings  # type: ignore
from app.core.lifespan import lifespan  # type: ignore
from app.core.middleware import setup_middlewares  # type: ignore


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, lifespan=lifespan)
    setup_middlewares(app)
    setup_routers(app)
    return app


app = create_app()


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Crop Prediction API!"}
