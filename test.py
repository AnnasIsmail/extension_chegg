from fastapi import FastAPI, HTTPException
import webbrowser
import pyautogui
import boto3
import time
import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel
from requests.exceptions import RequestException
from typing import Dict
import datetime
import threading
import subprocess
import pygetwindow as gw

def is_save_as_window_open() -> bool:
    return "Save As" in pyautogui.getAllTitles()

def is_error_page_open() -> bool:
    return "Error Page" in pyautogui.getAllTitles()

def wait_for_save_as_or_error_page_window(timeout=60) -> bool:
    start_time = time.time()
    while not is_save_as_window_open() and not is_error_page_open():
        if time.time() - start_time > timeout:
            return False
        time.sleep(1)
    return True


if wait_for_save_as_or_error_page_window():
    print('detect')
            