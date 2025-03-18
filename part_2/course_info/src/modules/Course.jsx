const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((acc, val) => acc + val.exercises, 0)}
      />
    </div>
  )
}

const Header = (props) => {
  return <h2>{props.course.name}</h2>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} exercises={part} />
      ))}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name}: {props.exercises.exercises}
    </p>
  )
}

const Total = ({ total }) => {
  return <h3>Total: {total} exercises</h3>
}

export default Course
