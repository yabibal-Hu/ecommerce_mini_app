

// interface user {
//   id?: string;
//   username?: string;
//   [key: string]: any;
// }

// interface ValidatedData {
//   [key: string]: string;
// }

// interface ValidatedResult {
//   ValidatedData: ValidatedData | null;
//   user: user;
//   message: string;
// }

// export function validateTelegramWebAppData(telegramInitData: string): ValidatedResult {
//     const BOT_TOKEN = process.env.BOT_TOKEN;

//     let ValidatedData: ValidatedData | null = null;
//     let user: user = {};
//     let message = "";

//     if(!BOT_TOKEN) {
//         return {message: "BOT_TOKEN is not defined", ValidatedData: null, user: {}};
//     }

// const initData = new URLSearchParams(telegramInitData);
// const hash = initData.get("hash");

// if (!hash) {
//     return {message: "Hash is not defined", ValidatedData: null, user: {}};
// }

// initData.delete("hash");

// const authData = initData.get("auth_date");
// if (!authData) {
//     return {message: "auth_date is missing from the initData", ValidatedData: null, user: {}};
// }

// const authTimestamp = parseInt(authData, 10);
// const currentTimestamp = Math.floor(Date.now() / 1000);
// const timeDifference = currentTimestamp - authTimestamp;
// const fiveMinutesInSeconds = 60 * 5;

// if (timeDifference > fiveMinutesInSeconds) {
//     return {message: "auth_date is older than 5 minutes", ValidatedData: null, user: {}};
// }

// const dataChackString = Array.from(initData.entries())
// .sort(([a], [b]) => a.localeCompare(b))
// .map(([key, value]) => `${key}=${value}`)
// .join('\n');

// const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
// const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataChackString).digest('hex');

// if (calculatedHash === hash) {
//     ValidatedData = Object.fromEntries(initData.entries());
//     message= 'Validation success';
//     const userString = ValidatedData['user'];
//     if (userString) {
//         try{
//             user = JSON.parse(userString);
//         } catch (error) {
//             console.error('Error parsing user data:', error);
//             message = 'Error parsing user data: ';
//             ValidatedData = null;
//         }
//     }else{
//         message = 'User data is missing';
//         ValidatedData = null;
//     }
// }else{
//     message = 'Hash Validation failed';
//     }

// return {ValidatedData, user, message};
// }