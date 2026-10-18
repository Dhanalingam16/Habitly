import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const cookieName = "habitly_session";
function key() {
 const value = process.env.JWT_SECRET;
 if (!value || value.length < 32) throw new Error("JWT_SECRET must be at least 32 characters.");
 return new TextEncoder().encode(value);
}
export async function createSession(userId: string) {
 const token = await new SignJWT({}).setProtectedHeader({ alg: "HS256" }).setSubject(userId).setIssuedAt().setExpirationTime("7d").sign(key());
 (await cookies()).set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 604800 });
}
export async function clearSession() { (await cookies()).set(cookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 }); }
export async function getSessionUserId(): Promise<string | null> {
 try { const token = (await cookies()).get(cookieName)?.value; if (!token) return null; const { payload } = await jwtVerify(token, key()); return typeof payload.sub === "string" ? payload.sub : null; } catch { return null; }
}
