import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyA2iPM2mdJIQpccBjxQP89hQG8k7euSUcM",
  authDomain: "botluck-9205b.firebaseapp.com",
  projectId: "botluck-9205b",
  storageBucket: "botluck-9205b.appspot.com",
  messagingSenderId: "508136237783",
  appId: "1:508136237783:web:3c79a9eaf3017ba8e89e92"
};

let serviceAccount;

if (process.env.FIREBASE_ADMIN_SDK) {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);
} else {
  throw new Error("The FIREBASE_ADMIN_SDK environment variable is not set");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
});

const db = admin.database();

// In this code, the usageCounter function increments the request counter for the current day.
// The counter is stored in the requestCounters node of the Firebase Realtime Database
// with the key being the date in YYYY - MM - DD format.
// The function uses a transaction to ensure that the counter is incremented atomically.
// The transaction either increments the current count or sets it to 1 if it doesn't exist yet.
// Finally, the function logs the updated request count to the console.
export const incrementUsageCounter = async () => {
  const date = new Date().toISOString().substring(0, 10);
  const counterRef = db.ref(`usageCounters/${date}`);

  let requestCount = 0;
  await counterRef.transaction(currentCount => {
    if (currentCount) {
      requestCount = currentCount + 1;
      return requestCount;
    }
    return 1;
  });

  console.log(`Today's request count: ${requestCount}`);
};

export const getRequestCount = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const requestCountRef = db.ref(`request_count/${year}/${month}/${day}`);

  const snapshot = await requestCountRef.once('value');
  const requestCount = snapshot.val() || 0;

  return requestCount;
}

export const getCumulativeRequestCount = async (): Promise<number> => {
  const requestCountRef = db.ref('request_count');

  const snapshot = await requestCountRef.once('value');
  const requestCounts = snapshot.val();

  let cumulativeRequestCount = 0;
  if (requestCounts) {
    Object.values(requestCounts).forEach((countsByMonth: unknown) => {
      Object.values(countsByMonth as { [key: string]: { [key: string]: number; }; }).forEach((countsByDay: unknown) => {
        cumulativeRequestCount += Object.values(countsByDay as { [key: string]: number }).reduce((sum, count) => sum + count, 0);
      });
    });
  }

  return cumulativeRequestCount;
};