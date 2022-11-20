from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import os


app = FastAPI()

class File(BaseModel):
    url: str


@app.get("/")
def index():
    return {"status": "Ok"}

@app.get("/py-version")
def py_version():
    return {"version": subprocess.check_output(["python", "--version"])}

@app.post("/run")
def run(file: File):
    file_url = file.url

    os.system(f"wget {file_url}")
    file_path = os.path.basename(file_url)

    output = subprocess.run(["python", file_path], capture_output=True)
    return {"output": output.stdout.decode("utf-8")}