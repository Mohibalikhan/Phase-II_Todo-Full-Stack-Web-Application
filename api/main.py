from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 🔥 CORS middleware add karo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # testing ke liye sab allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API is running!"}
