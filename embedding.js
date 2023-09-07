import { connect, model, Schema } from "mongoose";
connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

const authorSchema = new Schema({
  name: String,
  bio: String,
  website: String,
});
const Author = model("Author", authorSchema);

const Course = model(
  "Course",
  new Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
//   const course = new Course({ name, author });
//   const result = await course.save();
//   console.log(result);
//-------------------------------------------
// if there is more than one author for a course
  const course = new Course({ name, authors });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
    // const course = await Course.findById(courseId)
    // course.author.name = "Mosh Hamedani"
    // course.save()
// -------------------------------------
// const courses = await Course.updateOne({_id:courseId}, {$set:{"author.name":"John Smith"}});
// ----------------------------------------
const courses = await Course.updateOne({_id:courseId}, {$unset:{"author":""}}); // remove author document 

}

async function addAuthor (courseId, author){

    const course = await Course.findOne({_id:courseId})
    course.authors.push(author);
    course.save()
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findOne({_id:courseId})

    const author = course.authors.remove(authorId);// removes the author with provided ID
    console.log(author) // shows the all the authors of the course
    // author.remove()
    course.save()

}

// createCourse("React Course", [
//     new Author({ name: "Mosh" }),
//     new Author({ name: "John Smith" }),
//     new Author({ name: "Kyle" })
// ]);


// addAuthor("64f8ae3683b406e28a95f502", new Author({name:"Mostafa"}));

removeAuthor("64f8ae3683b406e28a95f502", "64f8ae3683b406e28a95f4ff")

// updateAuthor("64f8aa183f30f8c480639835")

// listCourses();
