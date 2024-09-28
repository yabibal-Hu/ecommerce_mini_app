// import { encrypt,SESSION_DURATION } from "@/utils/session";
// import { validateTelegramWebAppData } from "@/utils/telegramAuth";
// import {cookies} from "next/headers";
// import { NextResponse} from "next/server";


// export async function POST(request: Request) {
//     const {initData} = await request.json();

//     const ValidationResult = validateTelegramWebAppData(initData);

//     if (ValidationResult.ValidatedData) {
//         console.log("Validation result:", ValidationResult);
//         const user = {telegramId:ValidationResult.user.id}

//         //create a new session
//         const expires = new Date(Date.now() + SESSION_DURATION);
//         const session = await encrypt({user,expires});

//         //save the session in the cookie
//         cookies().set("session", session, {expires, httpOnly: true});

//         return NextResponse.json({message: 'Authentication success'}, {status: 200});

//     }else {
//         return NextResponse.json({message: ValidationResult.message}, {status: 400});
//     }
// }