import { motion } from "framer-motion";
import React from 'react';

const steps = [
  {
    number: 1,
    title: "Consultation",
    desc: "Un conseiller dédié prend le temps de comprendre vos besoins et préférences pour vous orienter vers les meilleures options.",
    image: "/consultation.jpg"
  },
  {
    number: 2,
    title: "Essai Personnalisé",
    desc: "Testez les véhicules présélectionnés lors d'essais routiers adaptés à vos attentes, dans des conditions optimales.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: 3,
    title: "Personnalisation",
    desc: "Configurez votre véhicule selon vos préférences, des finitions aux accessoires, pour une voiture qui vous ressemble.",
    image: "/personalisation.jpg"
  },
  {
    number: 4,
    title: "Financement",
    desc: "Notre équipe financière vous accompagne pour trouver la solution de paiement la plus adaptée à votre situation.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: 5,
    title: "Préparation",
    desc: "Votre véhicule est minutieusement préparé par nos techniciens pour vous assurer une prise en main dans des conditions parfaites.",
    image: "/preparation.jpg"
  },
  {
    number: 6,
    title: "Livraison",
    desc: "Profitez d'une livraison personnalisée avec une présentation détaillée de votre nouveau véhicule par un expert.",
    image: "/livraison.jpg"
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

export default function ServiceProcess() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#10131a] to-[#181c24] py-24 px-4 md:px-8 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            Notre Processus
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            Un service d'excellence en toute transparence, du premier contact à la livraison.
          </p>
        </motion.div>

        <div className="space-y-32">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.number}
                className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
                }}
              >
                {/* Parallax Image */}
                <motion.div
                  className="relative w-full md:w-1/2 h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.04, rotate: isEven ? 2 : -2 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Floating number badge */}
                  <motion.div
                    className="absolute top-6 left-6 bg-primary/90 text-white text-3xl font-extrabold w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#181c24]"
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  >
                    {step.number}
                  </motion.div>
                </motion.div>
                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-300 font-light">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
