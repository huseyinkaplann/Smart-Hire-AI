import logging
from datetime import datetime

log_file = f"logs/smarthire_{datetime.now().strftime('%Y%m%d')}.log"

logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def log_event(message: str):
    logging.info(message)

def log_error(message: str):
    logging.error(message)
