"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateMessages() {
  revalidateTag("messages");
  redirect("/");
}

export async function revalidateAll() {
  revalidatePath("/");
}

export async function revalidateInventory() {
  revalidatePath("/api/inventory");
}
export async function revalidateDashboard() {
  revalidatePath("/dashboard");
}
export async function revalidateInbox() {
  revalidatePath("/dashboard/inbox");
}
export async function revalidateCustomers() {
  revalidatePath("/api/get-customers");
}
