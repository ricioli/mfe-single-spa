import Teste from '@/pages/Teste';

export default function App(props) {
  return (
    <section>
      {props.name} is mounted! <Teste>alex</Teste>
    </section>
  );
}
