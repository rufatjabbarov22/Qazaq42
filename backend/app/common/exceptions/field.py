from fastapi import HTTPException, status


class FieldAlreadyExists(HTTPException):
    def __init__(self, district_id):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Field already exists in district {district_id}"
        )


class FieldCreationFailed(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Field creation failed due to an unexpected error.",
        )


class FieldNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Field not found"
        )
