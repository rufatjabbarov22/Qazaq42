import logging
import os

from logging.handlers import TimedRotatingFileHandler

from app.core.config import settings  # type: ignore


log_directory = settings.PROJECT_PATH + '/logs'
if not os.path.exists(log_directory):
    os.makedirs(log_directory)


class CustomFormatter(logging.Formatter):
    def format(self, record):
        if not hasattr(record, "id"):
            record.id = ""
        return super().format(record)


def configure_logging():
    logger = logging.getLogger("ai_service")
    logger.setLevel(logging.DEBUG)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    file_handler = TimedRotatingFileHandler(
        os.path.join(log_directory, 'ai_service.log'), when="midnight", interval=1
    )
    file_handler.setLevel(logging.DEBUG)

    formatter = CustomFormatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(id)s - %(message)s'
    )
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger


logger = configure_logging()
