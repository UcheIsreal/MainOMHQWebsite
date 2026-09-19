"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  createPost,
  updatePost,
  deletePost,
  uniqueSlug,
  getPostById,
} from "@/lib/db";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function readPostFields(formData) {
  return {
    title: formData.get("title")?.toString().trim() || "",
    excerpt: formData.get("excerpt")?.toString().trim() || "",
    content: formData.get("content")?.toString() || "",
    coverImageUrl: formData.get("coverImageUrl")?.toString().trim() || "",
    published: formData.get("published") === "on",
  };
}

export async function createPostAction(prevState, formData) {
  await requireSession();
  const fields = readPostFields(formData);

  if (!fields.title) {
    return { error: "Give the post a title." };
  }
  if (!fields.excerpt) {
    return { error: "Add a short excerpt \u2014 it's used on the blog list and in search results." };
  }

  const slug = await uniqueSlug(fields.title);
  await createPost({ ...fields, slug });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updatePostAction(id, prevState, formData) {
  await requireSession();
  const existing = await getPostById(id);
  if (!existing) {
    return { error: "That post no longer exists." };
  }

  const fields = readPostFields(formData);
  if (!fields.title) {
    return { error: "Give the post a title." };
  }
  if (!fields.excerpt) {
    return { error: "Add a short excerpt \u2014 it's used on the blog list and in search results." };
  }

  const slug =
    fields.title === existing.title
      ? existing.slug
      : await uniqueSlug(fields.title, id);
  await updatePost(id, { ...fields, slug });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deletePostAction(id, formData) {
  await requireSession();
  const existing = await getPostById(id);
  await deletePost(id);
  revalidatePath("/blog");
  if (existing) revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}
