import fotoHome from "../assets/foto-home-1.jpg";
import "./Home.css";
import { Recycle, FileText, Package, Wine, Cpu, Battery } from "lucide-react";

export default function Home() {
    return (
        <div className="home-page">
            
            <section className="home-hero">
                <div className="home-container">
                    <div className="home-left">
                        <h1>Conecte-se com catadores perto de você</h1>
                        <p>Descarte seus recicláveis de forma consciente e apoie quem transforme isso com renda</p>
                        <ul className="home-list">
                            <li>Catadores verificados e avaliados</li>
                            <li>Agendamento rápido e fácil</li>
                            <li>Impacto social e ambiental</li>
                        </ul>
                        <div className="home-buttons">
                            <button className="btn-primary">Anunciar Materiais</button>
                            <button className="btn-outline">Recicladores</button>
                        </div>
                    </div>
                    <div className="home-right">
                        <img src={fotoHome} alt="Pessoa reciclando" />
                    </div>
                </div>
            </section>

            {/* MATERIAIS ACEITOS */}
            <section className="home-materiais-aceitos">
                <div className="materiais-cabecalho">
                    <h2>Materiais Aceitos</h2>
                    <p>Veja o que pode ser reciclado</p>
                </div>

                <div className="materiais-cards">
                    <div className="material-item plastico">
                        <Recycle size={32} />
                        <span>Plástico</span>
                    </div>

                    <div className="material-item papel">
                        <FileText size={32} />
                        <span>Papel</span>
                    </div>

                    <div className="material-item metal">
                        <Package size={32} />
                        <span>Metal</span>
                    </div>

                    <div className="material-item vidro">
                        <Wine size={32} />
                        <span>Vidro</span>
                    </div>

                    <div className="material-item eletronicos">
                        <Cpu size={32} />
                        <span>Eletrônicos</span>
                    </div>

                    <div className="material-item pilhas">
                        <Battery size={32} />
                        <span>Pilhas</span>
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section className="home-como-funciona">
                <div className="como-funciona-conteudo">
                    <div className="como-funciona-cabecalho">
                        <h1>Como funciona</h1>
                        <p>Conectar-se é simples e rápido</p>
                    </div>
                    <div className="como-funciona-cards-container">
                        <div className="como-funciona-card">
                            <div className="card-numero">1</div>
                            <div className="card-conteudo">
                                <h3>Conecte-se</h3>
                                <p>Busque recicladores próximos ou publique seus resíduos para descarte.</p>
                            </div>
                        </div>
                        <div className="como-funciona-card">
                            <div className="card-numero">2</div>
                            <div className="card-conteudo">
                                <h3>Combine</h3>
                                <p>Converse diretamente por WhatsApp ou ligação e agende o dia e horário da coleta.</p>
                            </div>
                        </div>
                        <div className="como-funciona-card">
                            <div className="card-numero">3</div>
                            <div className="card-conteudo">
                                <h3>Separe</h3>
                                <p>Organize seus materiais recicláveis</p>
                            </div>
                        </div>
                        <div className="como-funciona-card">
                            <div className="card-numero">4</div>
                            <div className="card-conteudo">
                                <h3>Impacte</h3>
                                <p>Contribua com renda e meio ambiente</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}