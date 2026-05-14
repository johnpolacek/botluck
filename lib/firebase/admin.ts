import admin from "firebase-admin"
import { firestore } from "firebase-admin"
import type { PotLuckData } from "../../components/Types"

const firebaseConfig = {
  apiKey: "AIzaSyA2iPM2mdJIQpccBjxQP89hQG8k7euSUcM",
  authDomain: "botluck-9205b.firebaseapp.com",
  projectId: "botluck-9205b",
  storageBucket: "botluck-9205b.appspot.com",
  messagingSenderId: "508136237783",
  appId: "1:508136237783:web:3c79a9eaf3017ba8e89e92",
}

try {
  if (!admin.apps.length) {
    throw new Error("Firebase admin is not initialized")
  }
} catch {
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

const getDailyDocumentId = () => {
  const now = new Date()
  return `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`
}

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

export const getRecentPotLucks = async (startAfter?: {
  _seconds: number
  _nanoseconds: number
}) => {
  const LIMIT = 8
  const potlucksRef = db.collection("potluck")
  const snapshot = startAfter
    ? await potlucksRef
        .orderBy("created", "desc")
        .limit(LIMIT)
        .startAfter(
          startAfter
            ? new firestore.Timestamp(
                startAfter._seconds,
                startAfter._nanoseconds
              )
            : ""
        )
        .get()
    : await potlucksRef.orderBy("created", "desc").limit(LIMIT).get()
  const recentPotLucks = snapshot.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
  })
  return recentPotLucks
}

export const MAX_DAILY_TOKENS = 250000
export const MAX_GENERATION_TOKENS = 2048
export const MAX_PROMPT_CHARACTERS = 8000
export const MAX_RATE_LIMIT_REQUESTS_PER_MINUTE = 12
export const MAX_RATE_LIMIT_REQUESTS_PER_DAY = 40

export const increaseTokenUsage = async (tokensUsed: number) => {
  const today = getDailyDocumentId()

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
  const today = getDailyDocumentId()

  const usageRef = db.collection("tokenUsage").doc(today)
  const usageData = await (await usageRef.get()).data()

  return (usageData?.tokensUsed || 0) > MAX_DAILY_TOKENS
}

export const reserveTokenUsage = async (tokensRequested: number) => {
  const tokensUsed = Math.max(0, Math.ceil(tokensRequested))
  const today = getDailyDocumentId()
  const usageRef = db.collection("tokenUsage").doc(today)

  return await db.runTransaction(async (transaction) => {
    const usageDoc = await transaction.get(usageRef)
    const currentTokens = usageDoc.data()?.tokensUsed || 0
    const nextTokens = currentTokens + tokensUsed

    if (nextTokens > MAX_DAILY_TOKENS) {
      return {
        allowed: false,
        currentTokens,
        maxTokens: MAX_DAILY_TOKENS,
      }
    }

    transaction.set(
      usageRef,
      {
        tokensUsed: nextTokens,
        updated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    return {
      allowed: true,
      currentTokens: nextTokens,
      maxTokens: MAX_DAILY_TOKENS,
    }
  })
}

export const checkAndRecordRateLimit = async (identifier: string) => {
  const now = Date.now()
  const today = getDailyDocumentId()
  const safeIdentifier = identifier.replace(/[/.#[\]]/g, "_")
  const rateLimitRef = db
    .collection("rateLimits")
    .doc(`${today}_${safeIdentifier}`)

  return await db.runTransaction(async (transaction) => {
    const rateLimitDoc = await transaction.get(rateLimitRef)
    const data = rateLimitDoc.data()
    const minuteWindowStartedAt =
      typeof data?.minuteWindowStartedAt === "number"
        ? data.minuteWindowStartedAt
        : now
    const isSameMinute = now - minuteWindowStartedAt < 60 * 1000
    const requestsThisMinute = isSameMinute ? data?.requestsThisMinute || 0 : 0
    const requestsToday = data?.requestsToday || 0

    if (
      requestsThisMinute >= MAX_RATE_LIMIT_REQUESTS_PER_MINUTE ||
      requestsToday >= MAX_RATE_LIMIT_REQUESTS_PER_DAY
    ) {
      return {
        allowed: false,
        requestsThisMinute,
        requestsToday,
      }
    }

    transaction.set(
      rateLimitRef,
      {
        minuteWindowStartedAt: isSameMinute ? minuteWindowStartedAt : now,
        requestsThisMinute: requestsThisMinute + 1,
        requestsToday: requestsToday + 1,
        updated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    return {
      allowed: true,
      requestsThisMinute: requestsThisMinute + 1,
      requestsToday: requestsToday + 1,
    }
  })
}
