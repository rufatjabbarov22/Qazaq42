from fastapi import FastAPI

from app.api import router  # type: ignore
from app.core.config import settings  # type: ignore
from app.core.lifespan import lifespan  # type: ignore
from app.core.middleware import setup_middlewares  # type: ignore


def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)
    setup_middlewares(app)
    app.include_router(router)
    return app


app = create_app()


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Crop Prediction API!"}
