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

let serviceAccount

if (process.env.FIREBASE_ADMIN_SDK) {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)
} else {
  throw new Error("The FIREBASE_ADMIN_SDK environment variable is not set")
}

try {
  admin.instanceId()
} catch (err) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
  })
}

const db = admin.firestore()

export const storePotLuckData = async (data: PotLuckData) => {
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
        .limit(20)
        .get()
    : await potlucksRef.orderBy("created", "desc").limit(20).get()
  const recentPotLucks = snapshot.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
  })
  return recentPotLucks
}

export const increaseTokenUsage = async (tokensUsed: number) => {
  // Get current date
  const now = new Date()
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

  const usageRef = db.collection("tokenUsage").doc(today)
  const usageData = await (await usageRef.get()).data()

  if (usageData) {
    const newTokensUsed = usageData.data().tokensUsed + tokensUsed
    return await usageRef.update({ tokensUsed: newTokensUsed })
  } else {
    return await db.collection("tokenUsage").doc(today).set({ tokensUsed })
  }
}

export const getCurrentTokenUsage = async () => {
  // Get current date
  const now = new Date()
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

  const usageRef = db.collection("tokenUsage").doc(today)
  const usageData = await (await usageRef.get()).data()

  if (usageData) {
    return usageData.data().tokensUsed
  } else {
    return 0
  }
}
