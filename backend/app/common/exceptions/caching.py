from fastapi import HTTPException, status


class CacheException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Cache error",
        )
