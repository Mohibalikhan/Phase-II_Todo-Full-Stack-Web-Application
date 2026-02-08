from fastapi import FastAPI

app = FastAPI()  # <- ye chahiye

@app.get("/")
def read_root():
    return {"message": "API is running!"}
