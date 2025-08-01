import { useState, useEffect, useRef } from 'react';

interface Country {
  name: string;
  flag: string;
  code: string;
}

interface WorldCountriesProps {
  selectedYear: number;
}

// Cyberpunk News Wall data structure
const newsByCountryAndYear: Record<string, Record<number, { title: string; image: string; content: string; category: string }>> = {
  DE: {
    2020: {
      title: "🇩🇪 IMPULSO DIGITAL: Auge Tecnológico Post-Pandemia",
      image: "https://i.imgur.com/jGhqvi0.jpeg",
      content: "DeepL revoluciona la traducción con IA neuronal, superando a Google Translate. Siemens implementa sensores inteligentes en fábricas, aumentando la eficiencia un 15%. Aleph Alpha inicia modelos de IA éticos para datos europeos.\nConsecuencias: Exportaciones crecen con mejor comunicación global, pero regulaciones frenan startups. Fuga de talentos a EE. UU. limita el avance.\nConflictos: Tensiones con China por chips afectan la producción de IA.",
      category: "INNOVACIÓN INDUSTRIAL"
    },
    2025: {
      title: "🇩🇪 LIDERAZGO EN IA: Revolución de Drones y Automatización",
      image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTFoYWNzMmRpeTRxOGV3dnUxZGxwaWN0dnd1Nm5ldGc1YnhxN2x4eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hICT60FXjtLrl6GSO0/giphy.gif",
      content: "Helsing lanza drones militares autónomos con IA, operando en enjambres para reconocimiento. Wilo automatiza fábricas, reduciendo mano de obra un 30%. DeepL Write optimiza la escritura empresarial.\nConsecuencias: Alemania lidera en defensa y competitividad industrial, pero despidos masivos generan protestas. Drones avivan debates éticos.\nConflictos: Ciberataques rusos contra proyectos militares escalan tensiones.",
      category: "MOVILIDAD FUTURA"
    },
    2030: {
      title: "🇩🇪  SOBERANÍA DIGITAL: IA en Salud y Logística",
      image: "https://i.pinimg.com/originals/81/96/42/819642f51df09ccf2e84bdae7983029e.gif",
      content: "Aleph Alpha lanza “Luminos”, un modelo de IA soberano para bancos y hospitales. DFKI desarrolla IA que diagnostica cáncer con 95% de precisión. DHL usa drones logísticos, reduciendo emisiones un 40%.\nConsecuencias: Independencia tecnológica fortalece a Europa, pero costos limitan acceso a startups. Privacidad de datos médicos preocupa.\nConflictos: Hackeos exponen datos de pacientes; EE. UU. presiona por acceso a Luminos.",
      category: "SOSTENIBILIDAD"
    },
    2035: {
      title: "🇩🇪 ERA CUÁNTICA: Ciudades y Energía Inteligentes",
      image: "https://i.pinimg.com/originals/4f/c1/88/4fc18898f1551179045cfc9e84186752.gif",
      content: "Infineon crea optimizadores cuánticos de IA, reduciendo consumo energético un 15%. Múnich, ciudad inteligente, optimiza tráfico y seguridad con IA. Max Planck desarrolla interfaces cerebro-computadora.\nConsecuencias: Alemania lidera en energía limpia y calidad urbana, pero la vigilancia genera protestas. Interfaces plantean riesgos de hackeo.\nConflictos: Ciberataques cuánticos chinos desatan crisis diplomática.",
      category: "MANUFACTURA AVANZADA"
    },
    2040: {
      title: "🇩🇪 SOCIEDAD SIMBIÓTICA: IA para Clima y Cognición",
      image: "https://i.pinimg.com/originals/d8/bb/01/d8bb014d108bcb14a40bc9c43e326202.gif",
      content: "Fraunhofer desarrolla IA para captura de carbono, eliminando un 20% de emisiones. Wearables de IA en Berlín mejoran memoria humana un 25%. Claas lanza robots agrícolas sin pesticidas.\nConsecuencias: Liderazgo climático y productividad crecen, pero desigualdad cognitiva y despidos rurales aumentan.\nConflictos: Disputas por tierras raras escalan sanciones contra China.",
      category: "CIUDADES INTELIGENTES"
    },
    2045: {
      title: "🇩🇪 ÉTICA GLOBAL: IA Consciente y Educación",
      image: "https://i.pinimg.com/originals/13/96/8c/13968cf7f22059c0ac6e94d2866270a6.gif",
      content: "DFKI crea IA metacognitiva para diplomacia y espacio. SAP ofrece educación universal con IA. Alemania impulsa una “Constitución Digital” en la ONU.\nConsecuencias: Paz y equidad educativa avanzan, pero el miedo a la IA consciente genera protestas. Regulación global se fragmenta.\nConflictos: Países autoritarios usan IA para vigilancia, desafiando la ética global.",
      category: "BIOTECNOLOGÍA"
    },
    2050: {
      title: "🇩🇪 FUTURO HUMANO: Espacio y Fusión con IA",
      image: "https://i.pinimg.com/originals/90/b4/af/90b4afa4156489e0edcf23a3904aaccc.gif",
      content: "DLR desarrolla IA para colonias en Marte. La Biblioteca Nacional recrea cultura en realidad virtual. Max Planck estabiliza fusión nuclear. Interfaces cerebro-IA triplican capacidades humanas.\nConsecuencias: Alemania lidera en espacio y energía, pero élites aumentadas crean brechas sociales.\nConflictos: Rivalidades por Marte escalan con China; anti-IA atacan laboratorios.",
      category: "LIDERAZGO GLOBAL"
    }
  }, 
  US: {
    2020: {
      title: "🇺🇸 USA CRISIS RESPONSE: Tech Policy Debates",
      image: "https://i.pinimg.com/originals/ff/36/07/ff360755f2e909116ab4e2686befd58d.gif",
      content: "En medio de la crisis sanitaria, EE. UU. debate ferozmente políticas tecnológicas. Empresas como OpenAI lanzan modelos de IA como GPT-3, transformando la generación de texto y automatizando trabajos creativos. Google y Amazon integran IA en logística sanitaria, optimizando entregas de vacunas con un 20% más de eficiencia. Sin embargo, preocupaciones sobre privacidad y monopolios tecnológicos dividen al Congreso.\nConsecuencias: La IA acelera la recuperación económica, pero aumenta la desigualdad laboral. Las regulaciones propuestas no prosperan por presión de Big Tech.\nConflictos: Tensiones con China por control de datos y chips de IA escalan a sanciones comerciales. Activistas denuncian vigilancia masiva con IA en respuesta a protestas.",
      category: "POLÍTICA TECNOLÓGICA"
    },
    2025: {
      title: "🇺🇸 BIOTECH BOOM: Renewable Energy Revolution",
      image: "https://i.pinimg.com/originals/1f/23/37/1f2337b7ed412daf44d3c5a8eca8dc06.gif",
      content: "Un impulso federal masivo impulsa la biotecnología y energías renovables. Moderna y BioNTech usan IA para diseñar biocatalizadores que convierten CO2 en biocombustibles, cubriendo el 15% de la demanda energética. Startups como Anthropic desarrollan IA que optimiza redes solares, alcanzando un 97% de eficiencia. La Casa Blanca lanza un 'Manhattan Project' para IA en energía limpia.\nConsecuencias: La economía se revitaliza, creando millones de empleos verdes. Sin embargo, trabajadores fósiles enfrentan despidos masivos.\nConflictos: Hackeos rusos a redes energéticas con IA generan apagones en California. Países petroleros boicotean la tecnología estadounidense.",
      category: "REVOLUCIÓN ENERGÉTICA"
    },
    2030: {
      title: "🇺🇸 DIGITAL TRANSFORMATION: Commercial Space Era",
      image: "https://i.pinimg.com/originals/3e/e0/ba/3ee0bad745a517c2f95b7c498646800d.gif",
      content: "La transformación digital culmina con SpaceX y Blue Origin comercializando el espacio. IA autónoma gestiona estaciones orbitales, reduciendo costos de lanzamiento un 50%. xAI lanza 'StarNet', una red de satélites con IA que ofrece internet global gratuito. Turistas visitan hoteles espaciales operados por robots con IA.\nConsecuencias: El acceso al espacio democratiza la innovación, pero amplía la brecha entre países ricos y pobres. El desempleo terrestre crece por automatización espacial.\nConflictos: China y Rusia acusan a EE. UU. de militarizar el espacio con IA, desencadenando una carrera armamentística orbital. Piratas espaciales hackean satélites StarNet.",
      category: "ERA ESPACIAL"
    },
    2035: {
      title: "🇺🇸 QUANTUM LEADERSHIP: Future Work Revolution",
      image: "https://i.pinimg.com/originals/0a/c2/af/0ac2af5415f9062d54f9366bb4b75610.gif",
      content: "EE. UU. domina la computación cuántica con procesadores de 10,000 qubits desarrollados por IBM y Google. Algoritmos cuánticos de IA resuelven optimización logística global, reduciendo emisiones de transporte un 30%. Startups como Rigetti integran IA cuántica en diseño de materiales, creando superaleaciones para energía de fusión. El trabajo remoto evoluciona con avatares de IA en metaversos corporativos.\nConsecuencias: La productividad laboral se dispara, pero la brecha tecnológica excluye a trabajadores no calificados. La educación no sigue el ritmo.\nConflictos: Ciberataques cuánticos chinos amenazan infraestructuras críticas. Tensiones con Europa por patentes de IA cuántica escalan.",
      category: "COMPUTACIÓN CUÁNTICA"
    },
    2040: {
      title: "🇺🇸 HYBRID SOCIETY: Digital-Physical Fusion",
      image: "https://i.pinimg.com/originals/96/76/b2/9676b2f7c027b20f9e6114b6f0f68b24.gif",
      content: "La sociedad híbrida físico-digital se consolida. Neuralink implementa interfaces cerebro-IA, permitiendo control mental de dispositivos y telepatía digital. Meta lanza un metaverso global con IA que simula entornos físicos con 99% de realismo. Ciudades como Nueva York usan IA para auto-gestionar tráfico, energía y seguridad.\nConsecuencias: La conectividad humana mejora, pero la adicción al metaverso genera crisis de salud mental. La privacidad desaparece por monitoreo constante.\nConflictos: Grupos anti-IA atacan servidores de Neuralink. Conflictos con la UE por regulaciones de interfaces cerebrales dividen el mercado global.",
      category: "SOCIEDAD HÍBRIDA"
    },
    2045: {
      title: "🇺🇸 SPACE COLONIZATION: AI Revolution Peak",
      image: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/c7d021e6c3160f729367521daa029eaf/large.gif",
      content: "Colonias permanentes en Marte, lideradas por SpaceX, albergan 100,000 personas. IA autónoma construye hábitats y gestiona recursos con 95% de eficiencia. xAI desarrolla 'Grok-Mars', una IA que coordina la economía marciana. Terapias génicas con IA prolongan la vida humana en entornos espaciales.\nConsecuencias: La colonización inspira a la humanidad, pero solo élites acceden a Marte, generando resentimiento global. La Tierra pierde talento clave.\nConflictos: Rivalidades con China por recursos marcianos escalan a conflictos espaciales. Movimientos terrestres exigen detener la colonización.",
      category: "COLONIZACIÓN ESPACIAL"
    },
    2050: {
      title: "🇺🇸 POST-SCARCITY SOCIETY: Interplanetary Exploration",
      image: "https://i.pinimg.com/originals/54/85/d1/5485d189773357e1bfd0fdeb36e6e884.gif",
      content: "EE. UU. alcanza una sociedad post-escasez con fusión nuclear estabilizada por IA, ofreciendo energía ilimitada. Robots con IA producen bienes básicos gratis. SpaceX explora Júpiter con sondas autónomas. Interfaces cerebro-IA universales convierten a los humanos en una especie híbrida.\nConsecuencias: La abundancia elimina la pobreza, pero crea apatía social. La fusión humano-IA redefine la identidad humana.\nConflictos: Naciones sin acceso a la fusión nuclear se rebelan. Filosofías anti-IA provocan guerras culturales globales.",
      category: "SOCIEDAD POST-ESCASEZ"
    },
  },
  JP: {
    2020: {
      title: "🇯🇵 JAPAN ADAPTS: Medical Robotics Innovation",
      image: "https://media.licdn.com/dms/image/v2/D4E12AQF7LzZvF9SO9A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732106746492?e=1759363200&v=beta&t=ZYOTAnhbaG8F4Vi3g-KVluYuPHcU7UTvVJd31wtkAJs",
      content: "Japón lidera la robótica médica para abordar el envejecimiento poblacional. SoftBank y Toyota lanzan robots asistenciales con IA, como Robohon y Human Support Robot, que cuidan a ancianos con 90% de satisfacción. La IA de Preferred Networks optimiza diagnósticos médicos, detectando enfermedades como el Alzheimer con un 85% de precisión. Universidades como la de Tokio integran IA en exoesqueletos para rehabilitación.\nConsecuencias: La calidad de vida de los ancianos mejora, reduciendo la carga en hospitales. Sin embargo, la dependencia de robots genera preocupaciones éticas sobre la deshumanización del cuidado.\nConflictos: Debates sobre privacidad de datos médicos escalan. Tensiones con China por patentes de IA en robótica limitan exportaciones.",
      category: "ROBÓTICA MÉDICA"
    },
    2025: {
      title: "🇯🇵 AI HEALTHCARE: Home Automation Boom",
      image: "https://i.pinimg.com/originals/cb/6f/7c/cb6f7c3462fe3af6071f4715b45dd818.gif",
      content: "La IA transforma la salud y los hogares japoneses. NEC desarrolla asistentes médicos con IA que monitorean signos vitales en tiempo real, reduciendo hospitalizaciones un 30%. Panasonic lanza hogares inteligentes con IA que gestionan energía, seguridad y tareas domésticas, ahorrando un 25% en costos. Robots domésticos como Pepper evolucionan con IA conversacional avanzada.\nConsecuencias: La salud preventiva y la comodidad doméstica se disparan, pero los altos costos excluyen a clases bajas. El desempleo en cuidado doméstico crece.\nConflictos: Hackeos a hogares inteligentes exponen datos personales. EE. UU. presiona por acceso a patentes de IA médica, generando fricciones comerciales.",
      category: "AUTOMATIZACIÓN DOMÉSTICA"
    },
    2030: {
      title: "🇯🇵 SMART CITIES: Urban Sustainability Advanced",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/aceeef81779309.5d09ccd58bf16.gif",
      content: "Tokio se convierte en la primera megaciudad inteligente y sostenible. Hitachi implementa IA para gestionar tráfico, energía y residuos, reduciendo emisiones un 50%. Sensores urbanos con IA de Fujitsu predicen desastres naturales con 95% de precisión. Edificios con IA generan energía solar y reciclan agua al 100%.\nConsecuencias: Tokio se vuelve un modelo global de sostenibilidad, atrayendo turismo tecnológico. Sin embargo, la vigilancia urbana genera protestas por privacidad.\nConflictos: Ciberataques norcoreanos a redes inteligentes causan apagones temporales. Disputas con China por tecnología de sensores escalan tensiones en el Mar de China Oriental.",
      category: "CIUDADES INTELIGENTES"
    },
    2035: {
      title: "🇯🇵 BRAIN-COMPUTER INTERFACE: Social Robotics Revolution",
      image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTRjdWJiczh5eGl4Z3pwc3hidHd5eHZ3Y3VlZWNxOWhlcWk1MWh5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPAn6hPp6Fqx7qw/giphy.gif",
      content: "Japón revoluciona las interfaces cerebro-computadora (BCI). Sony y RIKEN desarrollan BCI con IA que permite controlar dispositivos con el pensamiento, usado en gaming y rehabilitación. Robots sociales con IA de Honda, como ASIMO 2.0, interpretan emociones humanas con 98% de precisión, integrándose en escuelas y hospitales. La IA neuronal simula interacciones humanas.\nConsecuencias: La accesibilidad para discapacitados mejora, y los robots sociales reducen la soledad. Pero la adicción a BCI y el desempleo en educación preocupan.\nConflictos: Hackeos a BCI exponen pensamientos de usuarios, desatando escándalos. EE. UU. acusa a Japón de monopolizar el mercado de BCI.",
      category: "INTERFACES NEURALES"
    },
    2040: {
      title: "🇯🇵 AUTOMATED SOCIETY: Extended Longevity Era",
      image: "https://i.pinimg.com/originals/72/8e/c1/728ec1c8114ad3beb1dc0947b0a46634.gif",
      content: "Japón alcanza una sociedad totalmente automatizada. Mitsubishi desarrolla fábricas con IA que producen bienes sin intervención humana, aumentando la eficiencia un 40%. Terapias génicas con IA de Takeda extienden la esperanza de vida a 120 años. Robots agrícolas de Kubota cultivan el 80% de los alimentos con cero pesticidas.\nConsecuencias: La productividad y longevidad se disparan, pero la desigualdad crece entre quienes acceden a terapias y quienes no. La población rural disminuye.\nConflictos: Migraciones masivas a ciudades automatizadas generan disturbios. Disputas con Rusia por recursos para chips de IA escalan sanciones.",
      category: "SOCIEDAD AUTOMATIZADA"
    },
    2045: {
      title: "🇯🇵 VR-PHYSICAL FUSION: Daily Life Revolution",
      image: "https://i.pinimg.com/originals/ff/d2/78/ffd2786bac6eab688e2a9cb2fc0d0ec0.gif",
      content: "La fusión entre realidad virtual (VR) y física transforma la vida diaria. NTT crea un metaverso nacional con IA, donde el 70% de los japoneses trabajan y socializan. Dispositivos hápticos con IA de Canon simulan sensaciones físicas con 99% de realismo. Robots con IA integran experiencias VR en espacios físicos.\nConsecuencias: La conectividad social mejora, reduciendo el aislamiento. Sin embargo, la adicción a VR causa crisis de salud mental y colapso de empleos físicos.\nConflictos: Ciberataques chinos al metaverso paralizan la economía por días. Debates globales sobre regulación de VR dividen a Japón y la UE.",
      category: "REALIDADES MÚLTIPLES"
    },
    2050: {
      title: "🇯🇵 HUMAN-AI COEXISTENCE: Dimensional Exploration",
      image: "https://i.pinimg.com/originals/f9/e2/eb/f9e2ebdac7dbcd3cd271d8da527c1138.gif",
      content: "Japón lidera la convivencia humano-IA. Interfaces cerebro-IA universales de Toshiba permiten colaboración directa con máquinas, triplicando la creatividad humana. JAXA usa IA autónoma para explorar lunas de Júpiter. Ciudades flotantes en el Pacífico, gestionadas por IA, producen alimentos y energía al 100%. La IA cultural preserva tradiciones como el Noh en entornos virtuales.\nConsecuencias: Japón se convierte en un modelo de armonía tecnológica, pero la fusión humano-IA genera debates sobre identidad. Las élites tecnológicas dominan.\nConflictos: Rivalidades con EE. UU. por exploración espacial escalan. Movimientos anti-IA atacan ciudades flotantes, exigiendo un retorno a lo humano.",
      category: "COEXISTENCIA AVANZADA"
    }
  },
  FR: {
    2020: {
      title: "🇫🇷 FRANCE GREEN",
      image: "https://cimg3.ibsrv.net/cimg/www.dornob.com/900x600_85/315/21008_WATG_Greenblock_Honolulu_800-fps1-631315.gif",
      content: "Francia fortalece políticas ambientales con IA. Schneider Electric implementa IA para optimizar redes energéticas verdes, reduciendo emisiones un 10%. Startups como Qarnot usan IA para convertir calor de servidores en calefacción urbana. La IA de Dassault Systèmes modela ecosistemas, preservando la biodiversidad.\nConsecuencias: Francia lidera en sostenibilidad, atrayendo inversión verde. Sin embargo, los altos costos excluyen a pymes. La regulación estricta ralentiza startups.\nConflictos: Tensiones con EE. UU. por subsidios verdes generan disputas comerciales. Hackeos a redes energéticas exponen vulnerabilidades.",
      category: "CULTURA DIGITAL"
    },
    2025: {
      title: "🇫🇷 NUCLEAR LEADERSHIP",
      image: "https://i.pinimg.com/originals/48/92/43/489243a7b9195512b2c17bc7b18e2a40.gif",
      content: "Francia lidera energía nuclear avanzada con IA. EDF desarrolla reactores modulares controlados por IA, aumentando la eficiencia un 20%. Algoritmos de IA de Atos predicen fallos en plantas nucleares con 98% de precisión. La IA optimiza el reciclaje de residuos nucleares, reduciendo el impacto ambiental.\nConsecuencias: La energía barata impulsa la economía, pero la dependencia nuclear genera protestas anti-nucleares. Empleos tradicionales en energía disminuyen.\nConflictos: Rusia intenta sabotear proyectos nucleares con ciberataques. Debates en la UE sobre seguridad nuclear dividen a los estados miembros.",
      category: "ENERGÍA NUCLEAR"
    },
    2030: {
      title: "🇫🇷 GASTRONOMIC REVOLUTION",
      image: "https://i.pinimg.com/1200x/db/ed/b7/dbedb720b5f439a158297ccd62640e36.jpg",
      content: "Francia revoluciona la gastronomía con IA. Robots chefs de Moley Robotics, impulsados por IA, recrean recetas Michelin con 95% de precisión. La IA de Danone analiza gustos personalizados, creando alimentos funcionales. Granjas verticales en París usan IA para cultivar ingredientes raros.\nConsecuencias: La alta cocina se democratiza, pero chefs tradicionales pierden relevancia. La producción masiva reduce la autenticidad cultural.\nConflictos: Protestas de chefs artesanales contra robots. China intenta copiar tecnología gastronómica, generando disputas de propiedad intelectual.",
      category: "GASTRONOMÍA FUTURA"
    },
    2035: {
      title: "🇫🇷 SUSTAINABLE FASHION",
      image: "https://i.pinimg.com/1200x/36/cf/99/36cf995ac369d03ba429a70c7b952865.jpg",
      content: "Francia se convierte en el centro europeo de moda sostenible. LVMH usa IA para diseñar ropa con materiales reciclados al 100%, optimizando patrones con cero desperdicio. Startups como Balenciaga implementan IA para personalizar moda en tiempo real. Tiendas virtuales con IA reducen el impacto logístico.\nConsecuencias: La moda sostenible lidera el mercado, pero los precios altos excluyen a consumidores medios. Trabajadores textiles enfrentan despidos.\nConflictos: Competencia con Asia por materiales reciclados genera tensiones comerciales. Hackeos a diseños de IA exponen colecciones exclusivas.",
      category: "MODA SOSTENIBLE"
    },
    2040: {
      title: "🇫🇷 MULTICULTURAL SOCIETY",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "Francia construye una sociedad multicultural con IA. Algoritmos de integración social, desarrollados por INRIA, conectan comunidades mediante traducción automática y mediación cultural. Escuelas usan IA para enseñar en múltiples idiomas, aumentando la inclusión un 40%. Robots sociales asisten a inmigrantes.\nConsecuencias: La cohesión social mejora, pero la vigilancia de IA genera protestas por privacidad. La educación tradicional pierde relevancia.\nConflictos: Grupos nacionalistas atacan sistemas de IA por 'diluir la cultura'. Ciberataques externos intentan desestabilizar la integración.",
      category: "SOCIEDAD MULTICULTURAL"
    },
    2045: {
      title: "🇫🇷 TRADITION-TECH FUSION",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Francia fusiona tradición y tecnología. La IA de Ubisoft recrea sitios históricos como Notre-Dame en entornos inmersivos, atrayendo millones de turistas virtuales. Artesanos usan IA para restaurar obras de arte con precisión nanométrica. Viñedos con IA optimizan la producción de vino.\nConsecuencias: El turismo y la cultura florecen, pero la dependencia tecnológica preocupa a puristas. Los costos de restauración limitan el acceso.\nConflictos: Hackeos a entornos virtuales distorsionan el patrimonio. Tensiones con Italia por liderazgo cultural tecnológico.",
      category: "EXPERIENCIAS INMERSIVAS"
    },
    2050: {
      title: "🇫🇷 QUALITY OF LIFE",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "Francia se convierte en referente mundial de calidad de vida. Ciudades con IA gestionan salud, educación y ocio, aumentando la esperanza de vida a 100 años. Interfaces cerebro-IA de Thales personalizan experiencias urbanas. Viñedos autónomos producen vino sostenible al 100%.\nConsecuencias: La calidad de vida lidera globalmente, pero la brecha con zonas rurales crece. La fusión cerebro-IA plantea dilemas éticos.\nConflictos: Países en desarrollo critican el elitismo tecnológico. Movimientos anti-IA atacan laboratorios en París.",
      category: "HUMANISMO TECNOLÓGICO"
    }
  },
  BR: {
    2020: {
      title: "🇧🇷 BRAZIL DIGITAL",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Brasil digitaliza su biodiversidad con IA. Embrapa usa IA para mapear el Amazonas, identificando 10,000 especies nuevas. Startups como Nubank integran IA en finanzas, aumentando la inclusión bancaria un 25%. Sensores con IA monitorean deforestación en tiempo real.\nConsecuencias: La preservación mejora, pero la digitalización expone datos a hackeos. Comunidades indígenas protestan por vigilancia.\nConflictos: Tensiones con empresas extranjeras por acceso a datos de biodiversidad. Ciberataques internacionales amenazan servidores.",
      category: "BIODIVERSIDAD DIGITAL"
    },
    2025: {
      title: "🇧🇷 SMART AGRICULTURE",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Brasil revoluciona la agricultura con IA. Drones con IA de Embraer optimizan cultivos, aumentando rendimientos un 30%. John Deere lanza tractores autónomos con IA, reduciendo pesticidas un 50%. La IA analiza suelos, prediciendo sequías con 90% de precisión.\nConsecuencias: La producción alimentaria crece, pero pequeños agricultores son desplazados. Los costos tecnológicos limitan el acceso.\nConflictos: Protestas rurales contra la automatización. China intenta copiar tecnología agrícola, generando disputas legales.",
      category: "AGRICULTURA INTELIGENTE"
    },
    2030: {
      title: "🇧🇷 BIOECONOMY LEADERSHIP",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Brasil lidera la bioeconomía con IA. Petrobras desarrolla biocombustibles con IA, cubriendo el 40% de la demanda energética. Startups en São Paulo crean biomateriales con IA, reemplazando plásticos. La IA protege el Amazonas, reduciendo deforestación un 70%.\nConsecuencias: La economía verde crece, pero la dependencia de IA aumenta riesgos de ciberataques. Comunidades locales pierden empleos tradicionales.\nConflictos: EE. UU. impone sanciones por liderazgo bioeconómico. Hackeos rusos a sistemas de IA generan crisis ambiental.",
      category: "BIOECONOMÍA"
    },
    2035: {
      title: "🇧🇷 GREEN DEVELOPMENT",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "Brasil establece un modelo de desarrollo verde. IA de Vale optimiza minería sostenible, reciclando el 95% de residuos. Ciudades como Manaos usan IA para gestionar energía renovable y residuos. Drones reforestan el Amazonas con un 80% de éxito.\nConsecuencias: La sostenibilidad atrae inversión, pero desplaza a mineros tradicionales. La vigilancia de IA genera protestas indígenas.\nConflictos: Tensiones con Bolivia por recursos compartidos. Ciberataques chinos a sistemas de reforestación causan retrasos.",
      category: "DESARROLLO VERDE"
    },
    2040: {
      title: "🇧🇷 DIGITAL INTEGRATION",
      image: "https://pixabay.com/videos/girl-drawing-colors-paper-table-49395/4",
      content: "Brasil integra digitalmente su sociedad. IA de Globo personaliza educación en zonas rurales, aumentando alfabetización un 50%. Redes 6G con IA conectan el 100% del país. Robots con IA asisten en favelas, mejorando seguridad y salud.\nConsecuencias: La inclusión digital reduce desigualdades, pero la dependencia tecnológica preocupa. La privacidad se ve amenazada.\nConflictos: Hackeos a redes 6G exponen datos ciudadanos. Tensiones con Argentina por liderazgo digital regional.",
      category: "INTEGRACIÓN DIGITAL"
    },
    2045: {
      title: "🇧🇷 ARTIFICIAL ECOSYSTEMS",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Brasil lidera en ecosistemas artificiales. IA de Embrapa crea biomas sintéticos, preservando especies extintas. Ciudades flotantes en el Atlántico usan IA para producir alimentos y energía. Sensores con IA monitorean océanos, reduciendo contaminación un 60%.\nConsecuencias: La biodiversidad se recupera, pero los costos limitan el acceso global. Comunidades costeras son desplazadas.\nConflictos: Disputas con EE. UU. por patentes de biomas. Ataques anti-IA por ecologistas radicales.",
      category: "ECOSISTEMAS ARTIFICIALES"
    },
    2050: {
      title: "🇧🇷 NATURE-TECH FUSION",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "Brasil fusiona naturaleza y tecnología. IA autónoma gestiona reservas del Amazonas, restaurando el 90% del ecosistema. Interfaces cerebro-IA conectan humanos con entornos naturales, mejorando la conservación. Ciudades biointegradas producen energía y alimentos al 100%.\nConsecuencias: Brasil lidera en sostenibilidad global, pero la fusión humano-IA genera debates éticos. La brecha tecnológica crece.\nConflictos: Conflictos con China por liderazgo bioeconómico. Movimientos anti-IA atacan laboratorios en São Paulo.",
      category: "FUSIÓN PERFECTA"
    }
  },
  CN: {
    2020: {
      title: "🇨🇳 CHINA RECOVERY",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "China acelera su recuperación con IA y 5G. Huawei implementa redes 5G con IA, conectando el 80% de las ciudades. Baidu lanza Apollo, un sistema de conducción autónoma que domina el transporte urbano. La IA de Tencent optimiza logística sanitaria, distribuyendo vacunas con 95% de eficiencia.\nConsecuencias: La economía se recupera rápido, pero la vigilancia masiva con IA genera críticas. Startups pequeñas luchan por competir.\nConflictos: Sanciones de EE. UU. por chips de IA limitan exportaciones. Tensiones con India por ciberataques a redes 5G.",
      category: "RECUPERACIÓN TECNOLÓGICA"
    },
    2025: {
      title: "🇨🇳 SMART MANUFACTURING",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "China lidera la manufactura inteligente. Foxconn usa IA para automatizar el 70% de sus fábricas, aumentando la producción un 40%. Alibaba Cloud desarrolla IA que optimiza cadenas de suministro globales. Robots con IA producen electrónica con cero defectos.\nConsecuencias: China domina mercados globales, pero el desempleo industrial crece. La dependencia de IA aumenta riesgos de ciberataques.\nConflictos: EE. UU. acusa a China de robo de propiedad intelectual. Hackeos rusos a fábricas generan pérdidas millonarias.",
      category: "MANUFACTURA INTELIGENTE"
    },
    2030: {
      title: "🇨🇳 CASHLESS SOCIETY",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "China establece una sociedad sin efectivo. WeChat y Alipay usan IA para procesar 100% de transacciones digitales, con reconocimiento facial para pagos. La IA del Banco Popular predice riesgos financieros con 99% de precisión. Ciudades implementan monedas digitales con IA.\nConsecuencias: La economía digital crece, pero la vigilancia total elimina la privacidad. Los sistemas centralizados son vulnerables a hackeos.\nConflictos: Tensiones con la UE por regulaciones de privacidad. Ciberataques globales amenazan la moneda digital.",
      category: "SOCIEDAD SIN EFECTIVO"
    },
    2035: {
      title: "🇨🇳 AI SUPERPOWER",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "China se consolida como superpotencia en IA. SenseTime desarrolla IA de vigilancia que analiza 1 billón de datos diarios. Baidu lanza modelos de IA multimodal que superan a GPT-8, usados en educación y salud. Drones con IA patrullan fronteras con 100% de cobertura.\nConsecuencias: La influencia global de China crece, pero la vigilancia masiva provoca protestas internas. La brecha tecnológica excluye a países pequeños.\nConflictos: EE. UU. impone sanciones por vigilancia. Hackeos a sistemas de IA generan crisis diplomáticas.",
      category: "SUPERPOTENCIA IA"
    },
    2040: {
      title: "🇨🇳 DIGITAL SOCIETY",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "China completa su sociedad digital. IA de ByteDance personaliza entretenimiento y educación para 1.4 mil millones de personas. Ciudades como Shenzhen usan IA para gestionar tráfico, energía y seguridad al 100%. Interfaces cerebro-IA conectan ciudadanos a redes estatales.\nConsecuencias: La eficiencia social se dispara, pero la privacidad desaparece. La adicción a sistemas digitales genera crisis de salud mental.\nConflictos: Protestas internas contra control estatal. Tensiones con India por ciberespionaje en redes digitales.",
      category: "SOCIEDAD DIGITAL"
    },
    2045: {
      title: "🇨🇳 ANCIENT-FUTURE FUSION",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "China fusiona filosofía antigua con tecnología. IA de iFlytek recrea textos confucianos en entornos virtuales, promoviendo armonía social. Robots con IA restauran sitios históricos como la Gran Muralla. Ciudades inteligentes integran principios taoístas con IA.\nConsecuencias: La identidad cultural se fortalece, pero la censura de IA limita la libertad creativa. La tecnología es inaccesible para zonas rurales.\nConflictos: EE. UU. critica la censura cultural. Hackeos a entornos virtuales distorsionan el patrimonio.",
      category: "FILOSOFÍA TECNOLÓGICA"
    },
    2050: {
      title: "🇨🇳 HYBRID CIVILIZATION",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "China establece una civilización híbrida. Interfaces cerebro-IA universales conectan a ciudadanos con redes globales, triplicando la productividad. IA autónoma gestiona megaciudades flotantes en el Pacífico. La exploración espacial con IA alcanza Marte y más allá.\nConsecuencias: China lidera la innovación, pero la fusión humano-IA genera debates éticos. La censura tecnológica limita la disidencia.\nConflictos: Rivalidades con EE. UU. por colonias espaciales. Movimientos anti-IA atacan megaciudades.",
      category: "CIVILIZACIÓN HÍBRIDA"
    }
  },
  GB: {
    2020: {
      title: "🇬🇧 UK BREXIT",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Reino Unido impulsa fintech tras Brexit. Revolut y Monzo usan IA para personalizar finanzas, aumentando la inclusión un 30%. DeepMind desarrolla IA para optimizar redes energéticas, reduciendo costos un 15%. La IA analiza datos de comercio post-Brexit.\nConsecuencias: La economía se recupera rápido, pero la regulación estricta frena startups. La incertidumbre económica limita inversiones.\nConflictos: Tensiones con la UE por datos financieros. Ciberataques rusos a fintech exponen vulnerabilidades.",
      category: "FINTECH REVOLUTION"
    },
    2025: {
      title: "🇬🇧 FINTECH HUB",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Reino Unido consolida su liderazgo en fintech. IA de Barclays predice riesgos financieros con 95% de precisión. Edtech startups como Multiverse usan IA para personalizar educación virtual, aumentando graduaciones un 40%. Blockchain con IA asegura transacciones.\nConsecuencias: La educación y finanzas prosperan, pero el desempleo en banca tradicional crece. La brecha digital excluye a zonas rurales.\nConflictos: Disputas con la UE por regulaciones de IA. Hackeos a blockchain generan pérdidas millonarias.",
      category: "EDUCACIÓN VIRTUAL"
    },
    2030: {
      title: "🇬🇧 MEDICAL RESEARCH",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Reino Unido lidera investigación médica con IA. DeepMind diagnostica enfermedades raras con 97% de precisión. Oxford desarrolla terapias génicas con IA, extendiendo la vida un 10%. Robots quirúrgicos con IA realizan operaciones complejas.\nConsecuencias: La salud mejora, pero los costos limitan el acceso. La automatización quirúrgica reduce empleos médicos.\nConflictos: EE. UU. intenta adquirir tecnología médica. Protestas contra la privatización de datos del NHS.",
      category: "INVESTIGACIÓN MÉDICA"
    },
    2035: {
      title: "🇬🇧 CULTURAL INNOVATION",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "Reino Unido se convierte en centro de innovación cultural. La IA de la BBC recrea experiencias históricas en VR, atrayendo 50 millones de usuarios. Startups en Londres usan IA para generar música y arte, revitalizando industrias creativas. Museos digitalizan colecciones con IA.\nConsecuencias: El turismo cultural crece, pero artistas tradicionales protestan. La dependencia de IA limita la creatividad humana.\nConflictos: Hackeos a museos virtuales distorsionan el patrimonio. Tensiones con Francia por liderazgo cultural.",
      category: "INNOVACIÓN CULTURAL"
    },
    2040: {
      title: "🇬🇧 POST-WORK SOCIETY",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Reino Unido establece una sociedad post-trabajo. IA de ARM automatiza el 80% de los empleos administrativos. Renta básica universal, gestionada por IA, asegura estabilidad económica. Universidades usan IA para educación personalizada.\nConsecuencias: La calidad de vida mejora, pero la apatía social crece. La brecha entre élites tecnológicas y el resto aumenta.\nConflictos: Protestas contra la renta básica por desigualdad. Ciberataques rusos a sistemas de IA generan caos.",
      category: "SOCIEDAD POST-TRABAJO"
    },
    2045: {
      title: "🇬🇧 DIGITAL MONARCHY",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Reino Unido crea una monarquía digital. IA de BAE Systems gestiona participación ciudadana en decisiones reales, aumentando transparencia un 60%. Interfaces cerebro-IA conectan ciudadanos a redes democráticas. Londres usa IA para ciudades inteligentes.\nConsecuencias: La democracia digital fortalece la participación, pero la vigilancia genera protestas. La monarquía tecnológica divide opiniones.\nConflictos: Hackeos chinos a sistemas democráticos causan crisis. Tensiones con la UE por datos ciudadanos.",
      category: "DEMOCRACIA DIGITAL"
    },
    2050: {
      title: "🇬🇧 GLOBAL LABORATORY",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "Reino Unido se convierte en laboratorio mundial. DeepMind desarrolla IA metacognitiva para investigación científica, acelerando descubrimientos un 50%. Interfaces cerebro-IA universalizan el acceso al conocimiento. Ciudades flotantes producen energía limpia.\nConsecuencias: La innovación global crece, pero la fusión humano-IA genera debates éticos. La desigualdad tecnológica excluye a países pobres.\nConflictos: Rivalidades con China por liderazgo científico. Movimientos anti-IA atacan laboratorios en Cambridge.",
      category: "LABORATORIO GLOBAL"
    }
  },
  ES: {
    2020: {
      title: "🇪🇸 SPAIN SOLAR",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "España impulsa el turismo digital con IA. Telefónica usa IA para crear experiencias turísticas virtuales, atrayendo 10 millones de visitantes digitales. Iberdrola optimiza granjas solares con IA, aumentando eficiencia un 20%. Apps con IA personalizan viajes.\nConsecuencias: El turismo y la energía crecen, pero los empleos tradicionales en turismo disminuyen. La brecha digital afecta a zonas rurales.\nConflictos: Hackeos a plataformas turísticas exponen datos. Tensiones con Francia por liderazgo en energía solar.",
      category: "TURISMO DIGITAL"
    },
    2025: {
      title: "🇪🇸 RENEWABLE LEADERSHIP",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "España lidera en energías renovables con IA. Acciona usa IA para gestionar parques eólicos, reduciendo costos un 25%. La IA optimiza redes eléctricas, alcanzando un 95% de energía limpia. Drones con IA inspeccionan infraestructura renovable.\nConsecuencias: España exporta tecnología verde, pero los costos excluyen a pequeñas empresas. Trabajadores fósiles protestan por despidos.\nConflictos: Disputas con Marruecos por recursos solares. Ciberataques rusos a redes energéticas generan apagones.",
      category: "LIDERAZGO RENOVABLE"
    },
    2030: {
      title: "🇪🇸 MEDITERRANEAN AGRICULTURE",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "España revoluciona la agricultura mediterránea con IA. Drones de Ebro Foods optimizan cultivos de olivos y viñedos, aumentando rendimientos un 40%. La IA predice sequías con 90% de precisión. Granjas verticales en Valencia usan IA para cultivos sostenibles.\nConsecuencias: La seguridad alimentaria mejora, pero pequeños agricultores son desplazados. Los costos tecnológicos generan desigualdad.\nConflictos: Protestas rurales contra la automatización. Disputas con Italia por mercados agrícolas.",
      category: "AGRICULTURA MEDITERRÁNEA"
    },
    2035: {
      title: "🇪🇸 LONGEVITY CENTER",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "España se convierte en centro de longevidad. Grifols usa IA para desarrollar terapias génicas, extendiendo la vida un 15%. Hospitales en Barcelona integran IA para diagnósticos preventivos con 95% de precisión. Wearables con IA monitorean salud.\nConsecuencias: La esperanza de vida crece, pero los costos limitan el acceso. El desempleo médico aumenta por automatización.\nConflictos: EE. UU. intenta adquirir tecnología médica. Protestas por desigualdad en el acceso a terapias.",
      category: "MEDICINA PREVENTIVA"
    },
    2040: {
      title: "🇪🇸 MULTICULTURAL FUSION",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "España fusiona su diversidad cultural con IA. Indra desarrolla IA para integrar comunidades, traduciendo y mediando en tiempo real. Escuelas usan IA para educación multicultural, aumentando inclusión un 50%. Robots sociales asisten a inmigrantes.\nConsecuencias: La cohesión social mejora, pero la vigilancia de IA genera protestas. La educación tradicional pierde relevancia.\nConflictos: Grupos nacionalistas atacan sistemas de IA. Ciberataques marroquíes desestabilizan la integración.",
      category: "FUSIÓN MULTICULTURAL"
    },
    2045: {
      title: "🇪🇸 WORK-LIFE BALANCE",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "España lidera en equilibrio vida-trabajo. IA de BBVA optimiza horarios laborales, aumentando productividad un 30%. Ciudades como Madrid usan IA para gestionar ocio y salud urbana. Interfaces cerebro-IA personalizan experiencias de bienestar.\nConsecuencias: La calidad de vida mejora, pero la dependencia tecnológica preocupa. La brecha con zonas rurales crece.\nConflictos: Hackeos a sistemas de IA urbana causan caos. Tensiones con Portugal por liderazgo en bienestar.",
      category: "EQUILIBRIO VITAL"
    },
    2050: {
      title: "🇪🇸 TECH PARADISE",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "España se convierte en un paraíso tecnológico. IA autónoma gestiona ciudades costeras, produciendo energía y alimentos al 100%. Interfaces cerebro-IA de Telefónica conectan ciudadanos a entornos virtuales mediterráneos. La IA preserva el flamenco en VR.\nConsecuencias: España atrae turismo tecnológico, pero la fusión humano-IA genera debates éticos. La desigualdad regional persiste.\nConflictos: Rivalidades con Francia por liderazgo cultural. Movimientos anti-IA atacan centros tecnológicos.",
      category: "PARAÍSO TECNOLÓGICO"
    }
  },
  AU: {
    2020: {
      title: "🇦🇺 AUSTRALIA CLIMATE",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Australia gestiona crisis climáticas con IA. CSIRO usa IA para predecir incendios forestales con 90% de precisión. Atlassian desarrolla IA para optimizar redes de energía renovable, reduciendo emisiones un 15%. Drones con IA monitorean arrecifes de coral.\nConsecuencias: La respuesta climática mejora, pero los costos excluyen a comunidades rurales. La vigilancia de IA genera preocupaciones.\nConflictos: Tensiones con China por datos ambientales. Hackeos a sistemas de IA exponen vulnerabilidades.",
      category: "GESTIÓN CLIMÁTICA"
    },
    2025: {
      title: "🇦🇺 SPACE MINING",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Australia lidera minería espacial con IA. Rio Tinto desarrolla drones con IA para extraer minerales en asteroides, reduciendo costos un 30%. La IA de UNSW optimiza trayectorias espaciales. Satélites con IA monitorean recursos lunares.\nConsecuencias: La economía espacial crece, pero los empleos mineros terrestres disminuyen. La tecnología es inaccesible para países pequeños.\nConflictos: Disputas con EE. UU. por recursos espaciales. Ciberataques chinos a satélites generan tensión.",
      category: "MINERÍA ESPACIAL"
    },
    2030: {
      title: "🇦🇺 ECOSYSTEM PROTECTION",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Australia protege ecosistemas con IA. La IA de Qantas optimiza rutas aéreas, reduciendo emisiones un 20%. Sensores con IA monitorean la Gran Barrera de Coral, recuperando el 50% de los corales. Granjas solares con IA producen el 40% de la energía.\nConsecuencias: La biodiversidad mejora, pero la vigilancia de IA genera protestas. Los costos limitan el acceso a tecnología.\nConflictos: Tensiones con Indonesia por datos marinos. Hackeos rusos a sistemas de IA ambiental causan retrasos.",
      category: "PROTECCIÓN ECOSISTÉMICA"
    },
    2035: {
      title: "🇦🇺 EXTREME SURVIVAL",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "Australia lidera en supervivencia extrema con IA. Robots con IA de BHP gestionan desiertos, extrayendo agua del aire con 90% de eficiencia. La IA predice desastres climáticos, salvando miles de vidas. Refugios autónomos protegen a comunidades.\nConsecuencias: La resiliencia climática crece, pero la automatización desplaza a trabajadores rurales. La tecnología es costosa.\nConflictos: Disputas con China por recursos hídricos. Ataques anti-IA por ecologistas radicales.",
      category: "SUPERVIVENCIA EXTREMA"
    },
    2040: {
      title: "🇦🇺 RESILIENT SOCIETY",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Australia construye una sociedad resiliente con IA. Ciudades como Sídney usan IA para gestionar energía, agua y seguridad al 100%. La IA de Telstra personaliza educación en zonas remotas, aumentando alfabetización un 50%. Robots asisten en desastres.\nConsecuencias: La calidad de vida mejora, pero la brecha urbana-rural crece. La vigilancia de IA genera protestas.\nConflictos: Hackeos a ciudades inteligentes causan caos. Tensiones con Nueva Zelanda por liderazgo regional.",
      category: "SOCIEDAD RESILIENTE"
    },
    2045: {
      title: "🇦🇺 EXTRATERRESTRIAL RESEARCH",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Australia lidera investigación extraterrestre. IA de CSIRO analiza datos de exoplanetas, identificando 100 mundos habitables. Satélites con IA exploran lunas de Júpiter. Bases lunares autónomas producen oxígeno con IA.\nConsecuencias: Australia lidera en ciencia espacial, pero la tecnología es inaccesible para países pobres. La migración de talento preocupa.\nConflictos: Rivalidades con EE. UU. por datos espaciales. Hackeos chinos a satélites generan crisis.",
      category: "INVESTIGACIÓN EXTRATERRESTRE"
    },
    2050: {
      title: "🇦🇺 CIVILIZATION-NATURE",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "Australia logra coexistencia perfecta con la naturaleza. IA autónoma restaura el 90% de los ecosistemas dañados. Interfaces cerebro-IA conectan humanos con entornos naturales, mejorando la conservación. Ciudades flotantes producen energía limpia.\nConsecuencias: La sostenibilidad global crece, pero la fusión humano-IA genera debates éticos. La desigualdad tecnológica persiste.\nConflictos: Conflictos con China por liderazgo ecológico. Movimientos anti-IA atacan centros de investigación.",
      category: "COEXISTENCIA PERFECTA"
    }
  },
  CA: {
    2020: {
      title: "🇨🇦 CANADA INCLUSIVE",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Canadá impulsa políticas inclusivas con IA. Element AI desarrolla sistemas para reducir sesgos en contratación, aumentando diversidad un 25%. Shopify usa IA para personalizar comercio inclusivo. La IA analiza datos sociales para políticas equitativas.\nConsecuencias: La inclusión social mejora, pero la vigilancia de datos genera críticas. Startups pequeñas luchan por competir.\nConflictos: Tensiones con EE. UU. por datos transfronterizos. Hackeos a sistemas de IA exponen vulnerabilidades.",
      category: "POLÍTICAS INCLUSIVAS"
    },
    2025: {
      title: "🇨🇦 ETHICAL AI",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "Canadá lidera en IA ética. Mila desarrolla IA transparente, usada en salud y educación con 95% de confianza pública. La IA de BlackBerry asegura ciberseguridad, reduciendo hackeos un 50%. Políticas éticas regulan el uso de IA en el gobierno.\nConsecuencias: Canadá atrae inversión tecnológica, pero la regulación estricta frena startups. El desempleo en ciberseguridad crece.\nConflictos: Disputas con China por estándares éticos. Ciberataques rusos a sistemas de IA generan tensiones.",
      category: "IA ÉTICA"
    },
    2030: {
      title: "🇨🇦 MULTICULTURAL DIGITALIZATION",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Canadá digitaliza su diversidad multicultural. IA de Ubisoft Montreal personaliza educación en lenguas indígenas, aumentando alfabetización un 40%. Ciudades árticas como Iqaluit usan IA para gestionar energía y salud. Robots con IA asisten a inmigrantes.\nConsecuencias: La inclusión cultural crece, pero la vigilancia de IA genera protestas. La educación tradicional pierde relevancia.\nConflictos: Hackeos a sistemas educativos exponen datos. Tensiones con EE. UU. por liderazgo digital ártico.",
      category: "CIUDADES ÁRTICAS"
    },
    2035: {
      title: "🇨🇦 PERSONALIZED MEDICINE",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Canadá lidera en medicina personalizada. IA de Deep Genomics diseña terapias génicas, extendiendo la vida un 15%. Hospitales en Toronto usan IA para diagnósticos con 97% de precisión. Wearables con IA monitorean salud en tiempo real.\nConsecuencias: La salud mejora, pero los costos limitan el acceso. La automatización médica reduce empleos.\nConflictos: EE. UU. intenta adquirir tecnología médica. Protestas por desigualdad en el acceso a terapias.",
      category: "BIOTECNOLOGÍA DEL FRÍO"
    },
    2040: {
      title: "🇨🇦 DIGITAL DEMOCRACY",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "Canadá establece una democracia digital. IA de OpenText gestiona participación ciudadana, aumentando votación un 60%. Interfaces cerebro-IA conectan ciudadanos a redes democráticas. Ciudades como Vancouver usan IA para gestionar recursos.\nConsecuencias: La participación crece, pero la vigilancia de IA genera protestas. La privacidad se ve amenazada.\nConflictos: Hackeos chinos a sistemas democráticos causan crisis. Tensiones con la UE por datos ciudadanos.",
      category: "DEMOCRACIA DIGITAL"
    },
    2045: {
      title: "🇨🇦 EXTREME SURVIVAL",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Canadá lidera en supervivencia extrema con IA. Robots con IA gestionan comunidades árticas, extrayendo recursos con 90% de eficiencia. La IA predice desastres climáticos, salvando vidas. Refugios autónomos protegen a poblaciones remotas.\nConsecuencias: La resiliencia crece, pero la automatización desplaza a trabajadores árticos. La tecnología es costosa.\nConflictos: Disputas con Rusia por recursos árticos. Ataques anti-IA por comunidades indígenas.",
      category: "INVESTIGACIÓN EXTREMA"
    },
    2050: {
      title: "🇨🇦 TERRESTRIAL-POLAR",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "Canadá lidera la exploración polar con IA. IA autónoma explora el Ártico, descubriendo recursos sostenibles. Interfaces cerebro-IA conectan humanos con entornos polares, mejorando la conservación. Ciudades flotantes producen energía limpia.\nConsecuencias: Canadá lidera en sostenibilidad polar, pero la fusión humano-IA genera debates éticos. La desigualdad tecnológica persiste.\nConflictos: Rivalidades con Rusia por el Ártico. Movimientos anti-IA atacan centros de investigación.",
      category: "EXPLORACIÓN POLAR"
    }
  }
};

export const WorldCountries = ({ selectedYear }: WorldCountriesProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = [
    { name: 'Alemania', flag: '🇩🇪', code: 'DE' },
    { name: 'Estados Unidos', flag: '🇺🇸', code: 'US' },
    { name: 'Japón', flag: '🇯🇵', code: 'JP' },
    { name: 'Francia', flag: '🇫🇷', code: 'FR' },
    { name: 'Brasil', flag: '🇧🇷', code: 'BR' },
    { name: 'China', flag: '🇨🇳', code: 'CN' },
    { name: 'Reino Unido', flag: '🇬🇧', code: 'GB' },
    { name: 'España', flag: '🇪🇸', code: 'ES' },
    { name: 'Australia', flag: '🇦🇺', code: 'AU' },
    { name: 'Canadá', flag: '🇨🇦', code: 'CA' },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCountryCode) {
        // ESC to close news wall
        if (e.key === 'Escape') {
          setSelectedCountryCode(null);
          return;
        }
        return;
      }

      // Arrow key navigation
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % countries.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + countries.length) % countries.length);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 5, countries.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 5, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setSelectedCountryCode(countries[focusedIndex].code);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCountryCode, focusedIndex, countries]);

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
  };

  const selectedNews = selectedCountryCode 
    ? newsByCountryAndYear[selectedCountryCode]?.[selectedYear] 
    : null;

  return (
    <div ref={containerRef} className="flex flex-col items-center space-y-8 overflow-x-hidden max-w-full">
      <div className="text-center">
        <h2 className="text-4xl font-mono text-primary animate-cyber-glow mb-2">
          🌍 EL MUNDO EN {selectedYear}
        </h2>
        <p className="text-accent font-mono">
          {selectedCountryCode ? 'Presiona ESC para volver' : 'Usa las flechas para navegar, Enter para seleccionar'}
        </p>
      </div>

      {/* Country Selection Buttons */}
      {!selectedCountryCode && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl overflow-x-hidden">
          {countries.map((country, index) => (
            <button
              key={country.code}
              onClick={() => handleCountryClick(country.code)}
              className={`
                relative p-4 border-2 rounded-lg font-mono
                bg-card/20 backdrop-blur-sm
                transition-all duration-300 
                before:absolute before:inset-0 before:rounded-lg
                before:animate-cyber-pulse before:border before:border-primary before:opacity-0
                ${index === focusedIndex 
                  ? 'border-primary bg-primary/20 shadow-lg shadow-primary/50 before:opacity-100 scale-105' 
                  : 'border-accent/50 hover:border-primary hover:bg-primary/10 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 hover:before:opacity-100'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-2xl font-bold text-primary">{country.code}</span>
                <span className="text-xs text-foreground">{country.flag}</span>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              {index === focusedIndex && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Cyberpunk News Wall */}
      {selectedCountryCode && selectedNews && (
        <div className="w-full max-w-6xl mx-auto p-6 relative">
          {/* Background Matrix effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />
          <div className="absolute inset-0 bg-card/90 backdrop-blur-md border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20" />
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary/30 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
                  <span className="text-xl font-mono text-primary font-bold">{selectedCountryCode}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-mono text-primary font-bold">{selectedNews.title}</h3>
                  <p className="text-sm text-accent font-mono">{selectedNews.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountryCode(null)}
                className="w-8 h-8 bg-accent/20 hover:bg-accent/40 border border-accent/50 hover:border-accent rounded-lg p-3 font-mono text-sm text-accent transition-all duration-300 flex items-center justify-center text-accent hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden border border-primary/30 shadow-lg">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb";
                    }}
                  />
                </div>
                
                {/* Tech Details */}
                <div className="bg-card/50 border border-accent/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-accent">SISTEMA DE ANÁLISIS ACTIVO</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">REGIÓN:</span>
                    <span className="text-foreground">{countries.find(c => c.code === selectedCountryCode)?.name}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">PERIODO:</span>
                    <span className="text-foreground">{selectedYear}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">CATEGORÍA:</span>
                    <span className="text-primary">{selectedNews.category}</span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <div className="bg-card/30 border border-primary/20 rounded-lg p-6">
                  <h4 className="text-lg font-mono text-primary mb-4 border-b border-primary/20 pb-2">
                    REPORTE DE SITUACIÓN
                  </h4>
                  <p className="text-foreground leading-relaxed text-sm">
                    {selectedNews.content}
                  </p>
                </div>

                {/* Cyber Status */}
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-primary/10 border border-primary/30 rounded p-2 text-center">
                      <div className="text-xs font-mono text-accent mb-1">STAT {i + 1}</div>
                      <div className="text-primary font-mono font-bold">{(Math.random() * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary rounded-lg p-3 font-mono text-sm text-primary transition-all duration-300">
                    ANALIZAR DATOS
                  </button>
                  <button className="flex-1 bg-accent/20 hover:bg-accent/30 border border-accent/50 hover:border-accent rounded-lg p-3 font-mono text-sm text-accent transition-all duration-300">
                    EXPORTAR INFO
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-primary/20 pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>📊 CENTRO DE INTELIGENCIA GLOBAL • {selectedYear}</span>
              <span>🔒 ACCESO AUTORIZADO • CLASIFICACIÓN ALTA</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
