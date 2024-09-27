"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";

export async function createAirBnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedLocation &&
    !data.addedDescription &&
    data.addedCategory
  ) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    !data.addedLocation &&
    data.addedDescription &&
    data.addedCategory
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });
  return redirect(`/create/${homeId}/description`);
}

export async function createDescriptionPage(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;
  const homeId = formData.get("homeId") as string;

  const formattedDate = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

  const { data: imageData, error } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${formattedDate}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  if (error) {
    console.error(error);
    return;
  }

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathroooms: bathroomNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });

  return redirect("/");
}
