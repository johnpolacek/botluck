import admin from "firebase-admin"
import { PotLuckData } from "../../components/Types"

const firebaseConfig = {
  apiKey: "AIzaSyA2iPM2mdJIQpccBjxQP89hQG8k7euSUcM",
  authDomain: "botluck-9205b.firebaseapp.com",
  projectId: "botluck-9205b",
  storageBucket: "botluck-9205b.appspot.com",
  messagingSenderId: "508136237783",
  appId: "1:508136237783:web:3c79a9eaf3017ba8e89e92",
}

try {
  admin.instanceId()
} catch (err) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseConfig.projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
  })
}

const db = admin.firestore()

export const storePotLuckData = async (data: PotLuckData) => {
  console.log("storePotLuckData")
  const res = await db.collection("potluck").add({
    created: admin.firestore.FieldValue.serverTimestamp(),
    data,
  })

  return res.id
}

export const getPotLuck = async (id: string) => {
  const potLuckData = await (
    await db.collection("potluck").doc(id).get()
  ).data()

  if (potLuckData && potLuckData.created) {
    potLuckData.created = potLuckData.created.toDate().toISOString()
  }

  return potLuckData
}

export const getRecentPotLucks = async (startAfter?: string) => {
  const potlucksRef = db.collection("potluck")
  const snapshot = startAfter
    ? await potlucksRef
        .orderBy("created", "desc")
        .startAfter(startAfter)
        .limit(6)
        .get()
    : await potlucksRef.orderBy("created", "desc").limit(6).get()
  const recentPotLucks = snapshot.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
  })
  return recentPotLucks
}

export const MAX_DAILY_TOKENS = 10000

export const increaseTokenUsage = async (tokensUsed: number) => {
  console.log("increaseTokenUsage")
  // Get current date
  const now = new Date()
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

  const usageRef = db.collection("tokenUsage").doc(today)
  const usageData = await (await usageRef.get()).data()

  if (usageData) {
    const newTokensUsed = usageData.tokensUsed + tokensUsed
    return await usageRef.update({ tokensUsed: newTokensUsed })
  } else {
    return await db.collection("tokenUsage").doc(today).set({ tokensUsed })
  }
}

export const getAboveDailyUsageLimit = async () => {
  // Get current date
  const now = new Date()
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

  const usageRef = db.collection("tokenUsage").doc(today)
  const usageData = await (await usageRef.get()).data()

  console.log("tokens used: " + (usageData?.tokensUsed || 0))

  return (usageData?.tokensUsed || 0) > MAX_DAILY_TOKENS
}
