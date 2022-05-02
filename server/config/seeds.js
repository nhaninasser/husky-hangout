const db = require("./connection");
const { Category, Event, User } = require("../models");

// import hockey from '../../client/src/components/Events/assets/images/hockey.png';
// import party from '../../client/src/components/Events/assets/images/houseParty.jpg';
// import knitting from '../../client/src/components/Events/assets/images/knitting.jpg';

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Sports" },
    { name: "Party" },
    { name: "Crafts" },
  ]);
  console.log("categories seeded");

  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      event: "hockey",
      category: categories[0]._id,
      // image: hockey,
      eventText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      username: "fullmetal",
      attending: 52,
    },
    {
      event: "House Party",
      category: categories[1]._id,
      // image: party,
      eventText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      username: "fullmetal",
      attending: 965,
    },
    {
      event: "Knitting",
      category: categories[2]._id,
      // image: knitting,
      eventText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      username: "fullmetal",
      attending: 45,
    },
  ]);
  console.log("events seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Edward",
    lastName: "Elrick",
    email: "fma112@test.com",
    username: "fullmetal",
    password: "password12345",
    orders: [
      {
        products: [events[0]._id, events[0]._id, events[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Cid",
    lastName: "Highwind",
    email: "goodTea2@testmail.com",
    username: "spaceX",
    password: "password1234",
  });

  console.log("users seeded");

  process.exit();
});
