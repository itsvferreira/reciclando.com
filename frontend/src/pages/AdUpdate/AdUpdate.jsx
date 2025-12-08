import { useParams } from 'react-router-dom';
import AdForm from '../../components/AdForm/AdForm';

export default function AdUpdate() {
  const { id } = useParams();

  return (
    <main className='container d-flex align-items-center justify-content-center'>
      <div>
        <h1 className='mb-4'>Editar Anúncio</h1>
        <AdForm id={id} />
      </div>
    </main>
  );
}
