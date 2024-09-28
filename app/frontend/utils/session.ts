// import { jwtVerify, SignJWT } from "jose";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";


// const key = new TextEncoder().encode(process.env.JWT_SECRET);

// export const SESSION_DURATION = 60 * 60 * 100; // 1 hour

// export async function encrypt(payload: any) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(SESSION_DURATION)
//     .sign(key);
// }

// export async function decrypt(token: string) {
//   const { payload } = await jwtVerify(token, key, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }

// export async function getSession() {
//  const session = cookies().get("session")?.value;
//  console.log("session value", session);
//  if (!session) return null;
//  return await decrypt(session);
// }

// export async function updateSession(request:NextRequest) {
//  const session = request.cookies.get("session")?.value;
//  if (!session) return;

// //refresh the session so it doesent expire
//  const parsed = await decrypt(session);
//  parsed.expires = new Data(Date.now() + SESSION_DURATION);
//  const res = NextResponse.next();
//  res.cookies.set({
//   name: "session",
//   value: await encrypt(parsed),
//   httpOnly: true,
//   expiresparsed.expires,
//  })
//  return res;
// }