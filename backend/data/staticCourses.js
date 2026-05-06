const { Types } = require("mongoose");
const catalog = require("./coursesCatalog");

let counter = 1;
const nextHexId = () => (counter++).toString(16).padStart(24, "0");

const withIds = catalog.map((course) => ({
  ...course,
  _id: new Types.ObjectId(nextHexId()),
  modules: course.modules.map((m) => ({
    ...m,
    _id: new Types.ObjectId(nextHexId()),
  })),
}));

module.exports = withIds;
