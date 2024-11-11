from urllib.request import Request

from certifi import contents
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.responses import JSONResponse

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


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    exc_str = f'{exc}'.replace('\n', ' ').replace('  ', ' ')
    print(f"Validation error: {exc_str}")
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(content=content, status_code=422)