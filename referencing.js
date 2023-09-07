import { connect, model, Schema } from "mongoose";
connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

const Author = model(
  "Author",
  new Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = model(
  "Course",
  new Schema({
    name: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({ name, bio, website });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({ name, author });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().select("name author -_id").populate("author", "name -_id")
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My website")

// createCourse("Node Course", "64f88c2b7288d2eb94dd6e3f")

listCourses();
