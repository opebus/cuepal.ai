import Page from '../component/Lesson';
import Navbar from '../component/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar name='John Doe' />
      <Page />
    </div>
  );
}
