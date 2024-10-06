import prisma from "@/lib/db";
import { ListingCard } from "../components/ListingCard";
import { NoItems } from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });
  return data;
}

export default async function ReservationRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:py-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          description="Hey you don't have any reservations"
          title="Please add reservation to see them right here ..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              imagePath={item.Home?.photo as string}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              price={item.Home?.price as number}
              userId={user.id}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
              favoriteId={item.Home?.Favorite[0]?.id as string}
              homeId={item.Home?.id as string}
              pathName="/reservations"
            />
          ))}
        </div>
      )}
    </section>
  );
}
