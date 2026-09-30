import os

from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt

from passlib.context import CryptContext

from pydantic import BaseModel


# =========================================================
# Security configuration
# =========================================================

SECRET_KEY = os.getenv("JWT_SECRET")

if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET environment variable is not set")

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES =  60

HR_USERNAME = os.getenv("HR_USERNAME")

if not HR_USERNAME:
    raise RuntimeError("HR_USERNAME environment variable is not set")

HR_PASSWORD = os.getenv("HR_PASSWORD")

if not HR_PASSWORD:
    raise RuntimeError("HR_PASSWORD environment variable is not set")


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


# =========================================================
# Login schema
# =========================================================

class LoginRequest(BaseModel):
    username: str
    password: str


# =========================================================
# Password helpers
# =========================================================

def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def get_password_hash(password: str) -> str:

    return pwd_context.hash(password)


# =========================================================
# JWT helpers
# =========================================================

def create_access_token(
    username: str,
    role: str = "HR"
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": username,
        "role": role,
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
# =========================================================
# Refresh token helpers
# =========================================================

REFRESH_TOKEN_EXPIRE_DAYS = 7


def create_refresh_token(
    username: str,
    role: str = "HR"
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        days=REFRESH_TOKEN_EXPIRE_DAYS
    )

    payload = {
        "sub": username,
        "role": role,
        "type": "refresh",
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_refresh_token(token: str) -> dict:

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "refresh":
            raise ValueError("Invalid refresh token")

        username = payload.get("sub")
        role = payload.get("role")

        if not username or not role:
            raise ValueError("Invalid refresh token")

        return {
            "username": username,
            "role": role
        }

    except (JWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )

# =========================================================
# Password reset token helpers
# =========================================================

RESET_TOKEN_EXPIRE_MINUTES = 15


def create_password_reset_token(email: str) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=RESET_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": email,
        "type": "password_reset",
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_password_reset_token(token: str) -> str:

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "password_reset":
            raise ValueError("Invalid reset token")

        email = payload.get("sub")

        if not email:
            raise ValueError("Invalid reset token")

        return email

    except (JWTError, ValueError):

        raise HTTPException(
            status_code=400,
            detail="Invalid or expired password reset link"
        )


# =========================================================
# Current user
# =========================================================

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate authentication credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

        role = payload.get("role")

        if not username or not role:
            raise credentials_exception

        return {
            "username": username,
            "role": role
        }

    except JWTError:

        raise credentials_exception


# =========================================================
# HR authorization
# =========================================================

def require_hr(
    current_user: dict = Depends(get_current_user)
):

    if current_user.get("role") not in {
        "HR",
        "ADMIN"
    }:

        raise HTTPException(
            status_code=403,
            detail="HR access required"
        )

    return current_user