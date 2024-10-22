from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter

from utils import count_frequency, load_frequency, replace_in_text

from fastapi import FastAPI
from pydantic import BaseModel


class Text(BaseModel):
    text: str


class Replace(BaseModel):
    text: str
    replacements: dict


router = APIRouter(
    prefix="/lab-2",
    tags=["lab-2"],
    responses={404: {"description": "Not found"}},
)


@router.post("/count-frequency")
def read_root(text: Text):
    return count_frequency(text.text)


@router.get("/english-frequency")
def read_root():
    return load_frequency("english_frequency.json")


@router.post("/replace-in-text")
def read_root(replace: Replace):
    text = replace.text.upper()
    for letter, replacement in replace.replacements.items():
        if replacement != "":
            text = replace_in_text(text, letter, replacement)

    return text


app = FastAPI()

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


app.include_router(router)

