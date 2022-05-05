const db = require("./connection");
const { Category, Event, User } = require("../models");

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
      eventName: "hockey",
      category: categories[0]._id,
      eventText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      username: "fullmetal",
      attending: 52,
    },
    {
      eventName: "House Party",
      category: categories[1]._id,
      eventText:
        "Ac tortor vitae purus faucibus ornare. Sem integer vitae justo eget magna fermentum iaculis. Neque ornare aenean euismod elementum. In egestas erat imperdiet sed euismod nisi porta lorem. Sit amet tellus cras adipiscing enim eu turpis. Metus vulputate eu scelerisque felis imperdiet. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Felis eget nunc lobortis mattis aliquam faucibus. Adipiscing commodo elit at imperdiet dui accumsan. Massa enim nec dui nunc mattis enim ut tellus. Amet venenatis urna cursus eget nunc. Purus in massa tempor nec feugiat nisl pretium. Gravida neque convallis a cras semper auctor. ",
      username: "spaceX",
      attending: 965,
    },
    {
      eventName: "90s Themed Summer Jam!",
      category: categories[1]._id,
      eventText:
        "Ac tortor vitae purus faucibus ornare. Sem integer vitae justo eget magna fermentum iaculis. Neque ornare aenean euismod elementum. In egestas erat imperdiet sed euismod nisi porta lorem. Sit amet tellus cras adipiscing enim eu turpis. Metus vulputate eu scelerisque felis imperdiet. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Felis eget nunc lobortis mattis aliquam faucibus. Adipiscing commodo elit at imperdiet dui accumsan. Massa enim nec dui nunc mattis enim ut tellus. Amet venenatis urna cursus eget nunc. Purus in massa tempor nec feugiat nisl pretium. Gravida neque convallis a cras semper auctor. ",
      username: "WeinerMobile",
      attending: 965,
    },
    {
      eventName: "Knitting",
      category: categories[2]._id,
      eventText:
        "Aenean et tortor at risus viverra. Tortor condimentum lacinia quis vel eros donec ac. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Fermentum posuere urna nec tincidunt praesent semper. Odio euismod lacinia at quis. Bibendum ut tristique et egestas quis ipsum. Vitae tortor condimentum lacinia quis vel. Vitae congue mauris rhoncus aenean vel elit scelerisque. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed risus ultricies tristique nulla. Bibendum at varius vel pharetra vel turpis. Fusce ut placerat orci nulla. In iaculis nunc sed augue lacus viverra vitae congue eu.",
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

  await User.create({
    firstName: "Oscar",
    lastName: "Meyer",
    email: "bologna@testmail.com",
    username: "WeinerMobile",
    password: "password1234",
  });

  console.log("users seeded");

  process.exit();
});
