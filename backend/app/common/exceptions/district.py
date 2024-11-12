from fastapi import HTTPException, status


class DistrictAlreadyExists(HTTPException):
    def __init__(self, country_id):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"District already exists in country {country_id}"
        )


class DistrictCreationFailed(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="District creation failed due to an unexpected error."
        )


class DistrictNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="District not found"
        )
