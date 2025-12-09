import AdForm from '../../components/AdForm/AdForm';

export default function AdCreation() {
  return (
    <main className='container d-flex align-items-center justify-content-center'>
      <div>
        <h1>Criar Anúncio</h1>
        <p className='mb-4'>
          Publique seu anúncio e encontre um reciclador próximo a você
        </p>
        <AdForm donorId={1} />
      </div>
    </main>
  );
}
