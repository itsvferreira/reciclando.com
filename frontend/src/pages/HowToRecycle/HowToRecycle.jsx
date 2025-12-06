import { Wine, FileText, Laptop, BottleWine, Wrench, Leaf } from 'lucide-react';
import { CardMaterials } from '../../components/cardMaterials/CardMaterials';
import { CardTips } from '../../components/cardTips/CardTips';
import styles from './HowToRecycle.module.css';

export default function HowToRecycle() {
  const materialsData = {
    vidros: {
      icon: Wine,
      color: '#00c951',
      title: 'Vidros',
      description: 'Garrafas, frascos, potes e cacos.',
      howToRecycle: [
        'Lave os vidros para remover resíduos',
        'Remova tampas e rótulos quando possível',
        'Embale cacos em papel para evitar acidentes',
        'Deposite em lixeiras ou pontos de coleta específicos',
      ],
      importantCare: [
        'Não misture com cerâmica ou porcelana',
        'Espelhos e vidros temperados não são recicláveis',
        'Lâmpadas precisam de descarte especial',
      ],
    },
    papeis: {
      icon: FileText,
      color: '#2b7fff',
      title: 'Papéis',
      description: 'Jornais, revistas, papelão e cadernos',
      howToRecycle: [
        'Remova grampos, clipes e fitas adesivas',
        'Desdobre e achate as caixas de papelão',
        'Mantenha os papéis secos e limpos',
        'Separe papéis de escritório dos papelões',
        'Amarre jornais e revistas em pilhas pequenas',
        'Não amasse demais para facilitar a reciclagem',
      ],
      importantCare: [
        'Não misture papéis sujos de comida ou gordura',
        'Papel carbono e metalizado não são recicláveis',
        'Evite molhar os papéis antes da coleta',
        'Fotografias não devem ir com papel comum',
      ],
    },
    plasticos: {
      icon: BottleWine,
      color: '#fb2c36',
      title: 'Plásticos',
      description:
        'Garrafas PET, embalagens, sacolas, potes e tampas plásticas.',
      howToRecycle: [
        'Lave as embalagens para remover resíduos',
        'Retire tampas e rótulos quando possível',
        'Amasse garrafas PET para economizar espaço',
        'Agrupe por tipo de plástico se possível',
      ],
      importantCare: [
        'Plásticos muito sujos ou misturados não são recicláveis',
        'Embalagens de produtos químicos precisam de cuidado especial',
        'Isopor deve ser levado a pontos específicos',
        'Não queime plásticos',
      ],
    },
    metais: {
      icon: Wrench,
      color: '#FFDE21',
      title: 'Metais',
      description: 'Latas de alumínio, panelas, ferragens e arames',
      howToRecycle: [
        'Lave as latas para remover resíduos',
        'Amasse latas de alumínio para economizar espaço',
        'Separe metais ferrosos dos não-ferrosos',
        'Remova etiquetas quando possível',
        'Agrupe itens pequenos em sacolas',
      ],
      importantCare: [
        'Latas de tinta e aerossol precisam de descarte especial',
        'Objetos cortantes devem ser embalados com segurança',
        'Pilhas e baterias não são recicláveis com metais comuns',
        'Panelas com revestimento antiaderente têm restrições',
      ],
    },
    organico: {
      icon: Leaf,
      color: '#6E5415',
      title: 'Orgânico',
      description: 'Restos de alimentos, cascas e borra de café',
      howToRecycle: [
        'Separe dos recicláveis e rejeitos',
        'Use para compostagem doméstica',
        'Evite adicionar óleos e gorduras',
        'Misture restos verdes com restos marrons',
        'Mantenha a composteira úmida mas não encharcada',
      ],
      importantCare: [
        'Não inclua carnes e laticínios em composteiras simples',
        'Evite plantas doentes na compostagem',
        'Não composte fezes de animais carnívoros',
        'Cascas de cítricos devem ser usadas com moderação',
      ],
    },
    eletronicos: {
      icon: Laptop,
      color: '#1591EA',
      title: 'Eletrônicos',
      description:
        'Computadores, celulares, tablets e outros dispositivos eletrônicos.',
      howToRecycle: [
        'Apague todos os dados pessoais',
        'Remova baterias e pilhas',
        'Separe cabos e acessórios',
        'Leve a pontos de coleta especializados',
        'Considere doação se ainda funcionar',
      ],
      importantCare: [
        'Nunca jogue no lixo comum',
        'Pilhas e baterias precisam de descarte específico',
        'Componentes contêm metais pesados tóxicos',
        'Alguns fabricantes têm programas de logística reversa',
      ],
    },
  };

  return (
    <div className={styles.comoContainer}>
      <h1 className={styles.comoTitulo}>Como funciona a Reciclagem</h1>

      <p className={styles.comoSubtitulo}>
        Aprenda a separar corretamente cada tipo de material reciclável e
        contribua para um planeta mais sustentável
      </p>

      <div className={styles.gridMateriais}>
        <CardMaterials
          icon={Wine}
          color='#00c951'
          title='Vidros'
          description='Garrafas, frascos, potes e cacos.'
          materialData={materialsData.vidros}
        />

        <CardMaterials
          icon={FileText}
          color='#2b7fff'
          title='Papéis'
          description='Jornais, revistas, papelão e cadernos'
          materialData={materialsData.papeis}
        />

        <CardMaterials
          icon={BottleWine}
          color='#fb2c36'
          title='Plásticos'
          description='Garrafas PET, embalagens, sacolas, potes e tampas plásticas.'
          materialData={materialsData.plasticos}
        />

        <CardMaterials
          icon={Wrench}
          color='#FFDE21'
          title='Metais'
          description='Latas de alumínio, panelas, ferragens e arames'
          materialData={materialsData.metais}
        />

        <CardMaterials
          icon={Leaf}
          color='#6E5415'
          title='Orgânico'
          description='Restos de alimentos, cascas e borra de café'
          materialData={materialsData.organico}
        />

        <CardMaterials
          icon={Laptop}
          color='#1591EA'
          title='Eletrônicos'
          description='Computadores, celulares, tablets e outros dispositivos eletrônicos.'
          materialData={materialsData.eletronicos}
        />
      </div>

      <CardTips />
    </div>
  );
}
