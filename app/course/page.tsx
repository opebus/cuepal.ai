//import CoursePage from '../component/teacher/course';
import CoursePage from '../components/student/course';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar name='John Doe' />
      <CoursePage />
    </div>
  );
}
