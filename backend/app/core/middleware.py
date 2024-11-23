from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def setup_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,  # type: ignore
        allow_origins=[
            "http://0.0.0.0:3000",
            "http://localhost:3000",
            "https://qazaq.live"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
