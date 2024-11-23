from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def setup_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,  # type: ignore
        allow_origins=[
            "http://0.0.0.0:3000",
            "http://localhost:3000",
            "https://qazaq.live",
            "https://64.227.75.13:3000",
            "https://64.227.75.13"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
