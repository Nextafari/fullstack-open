import Header from './Header'
import Content from './Content'


const Total = ({parts}) => {
    // Using reduce on an array of objects, pass initial
    return ( 
        <strong>
            <p>
                Total of {
                    parts.reduce(
                        (previousValue, currentValue) => previousValue + currentValue.exercises, 0
                    )
                } exercises.
            </p>
        </strong>
    )
}

const Course = (props) => {
    const {course} = props

    return (
        <div>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course
