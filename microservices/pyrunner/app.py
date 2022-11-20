from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import os


app = FastAPI()

tags_metadata = [
    {
        "name": "index",
        "description": "Get server health",
    },
    {
        "name": "pyver",
        "description": "Get python version in server",
    },
    {
        "name": "run",
        "description": "Download and run a python script",
    },
    {
        "name": "packages",
        "description": "Get installed packages in server",
    }
]

class File(BaseModel):
    url: str


@app.get("/", tags=["index"], description=tags_metadata[0]["description"])
def index():
    return {"status": "Ok"}

@app.get("/py-version", tags=["pyver"], description=tags_metadata[1]["description"])
def py_version():
    return {"version": subprocess.check_output(["python", "--version"])}

@app.post("/run", tags=["run"], description=tags_metadata[2]["description"])
def run(file: File):
    file_url = file.url

    os.system(f"wget {file_url}")
    file_path = os.path.basename(file_url)

    output = subprocess.run(["python", file_path], capture_output=True)
    os.remove(file_path)

    return {"output": output.stdout.decode("utf-8")}

@app.get("/get-packages", tags=["packages"], description=tags_metadata[3]["description"])
def get_packages():
    with open("third-party.txt", "r") as f:
        packages = f.read().splitlines()

    packages = [{"name": package.split("==")[0], "version": package.split("==")[1]} for package in packages]

    return {"packages": packages}