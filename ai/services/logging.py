import logging
import os

from logging.handlers import TimedRotatingFileHandler

from app.core.config import settings  # type: ignore


log_directory = settings.PROJECT_PATH + '/logs'
if not os.path.exists(log_directory):
    os.makedirs(log_directory)


def configure_logging():
    logger = logging.getLogger("ai_service")
    logger.setLevel(logging.DEBUG)

    # Create handlers
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    file_handler = TimedRotatingFileHandler(
        os.path.join(log_directory, 'ai_service.log'), when="midnight", interval=1
    )
    file_handler.setLevel(logging.DEBUG)

    # Create formatters and add them to the handlers
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    # Add handlers to the logger
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger


logger = configure_logging()
