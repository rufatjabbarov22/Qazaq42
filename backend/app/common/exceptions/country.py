from fastapi import HTTPException, status


class CountryAlreadyExists(HTTPException):
    def __init__(self, country_id):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Country with ID {country_id} already exists"
        )


class CountryCreationFailed(HTTPException):
    def __init__(self):
        super().__init(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Country creation failed due to an unexpected error."
        )


class CountryNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Country not found"
        )
