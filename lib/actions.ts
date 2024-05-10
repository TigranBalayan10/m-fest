"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import {redirect} from "next/navigation"


export async function revalidateMessages() {
    revalidateTag("messages")
    redirect("/")
}
export async function revalidateInventory() {
    revalidateTag("inventory")
    redirect("/dashboard")
}

export async function revalidateAll() {
    revalidatePath("/")
    redirect("/")
}



