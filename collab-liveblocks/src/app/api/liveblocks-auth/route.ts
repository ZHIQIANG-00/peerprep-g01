import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database

  const postBody = await request.json();
  console.log('api route.ts postBody: ', postBody);

  const userId = Math.floor(Math.random() * 10) % USER_INFO.length;

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: USER_INFO[userId],
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(postBody.room, session.FULL_ACCESS);

  // const params = useSearchParams();
  // const collabId = params?.get("collabId");
  // const username = params?.get("username");

  // const userInfo = {name: username, color: '#D583F0', picture: 'https://liveblocks.io/avatars/avatar-1.png'};
  // console.log('userInfo: ', userInfo);
  // const session = liveblocks.prepareSession(`${username}`, {
  //   userInfo: userInfo,
  // });

  // // Use a naming pattern to allow access to rooms with a wildcard
  // session.allow(collabId, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}

const USER_INFO = [
  {
    name: "Charlie Layne",
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
  },
  {
    name: "Mislav Abha",
    color: "#F08385",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },
  // {
  //   name: "Tatum Paolo",
  //   color: "#F0D885",
  //   picture: "https://liveblocks.io/avatars/avatar-3.png",
  // },
  // {
  //   name: "Anjali Wanda",
  //   color: "#85EED6",
  //   picture: "https://liveblocks.io/avatars/avatar-4.png",
  // },
  // {
  //   name: "Jody Hekla",
  //   color: "#85BBF0",
  //   picture: "https://liveblocks.io/avatars/avatar-5.png",
  // },
  // {
  //   name: "Emil Joyce",
  //   color: "#8594F0",
  //   picture: "https://liveblocks.io/avatars/avatar-6.png",
  // },
  // {
  //   name: "Jory Quispe",
  //   color: "#85DBF0",
  //   picture: "https://liveblocks.io/avatars/avatar-7.png",
  // },
  // {
  //   name: "Quinn Elton",
  //   color: "#87EE85",
  //   picture: "https://liveblocks.io/avatars/avatar-8.png",
  // },
];
