from fastapi import HTTPException,status


class UserAlreadyExists(HTTPException):
    def __init__(self, email):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"User with email {email} already exists"
        )


class UserCreationFailed(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="User creation failed due to an unexpected error."
        )


class UserNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
