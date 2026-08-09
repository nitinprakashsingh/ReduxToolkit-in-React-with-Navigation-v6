import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";

type TokenPayload = jwt.JwtPayload & {
  sub?: string;
  email?: string;
  role?: string;
};

export function authenticate(request: Request, response: Response, next: NextFunction) {
  const authorization = request.header("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Authentication is required." });
  }

  try {
    const payload = jwt.verify(authorization.slice(7), env.JWT_SECRET) as TokenPayload;

    if (!payload.sub || !payload.email || !payload.role) {
      return response.status(401).json({ message: "Invalid authentication token." });
    }

    request.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    return response.status(401).json({ message: "Your session is invalid or has expired. Please sign in again." });
  }
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (request.user?.role !== "admin") {
    return response.status(403).json({ message: "Administrator access is required." });
  }

  next();
}
